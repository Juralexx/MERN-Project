import ProjectModel from '../../models/project.model.js'
import fs, { readdirSync, rmdir } from 'fs'
import { promisify } from 'util'
import stream from 'stream'
const pipeline = promisify(stream.pipeline)
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url))
import sharp from 'sharp'

/**
 * Create new actuality.
 * @param {*} id Project ID to post actuality in
 * @param {*} actuality Actuality object
 * @param {*} activity Activity feed
 */

export const createActuality = async (req, res) => {
    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $addToSet: {
                    actualities: req.body.actuality,
                    activity_feed: req.body.activity
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        const errors = actualityErrors(err)
        res.status(200).json({ errors })
    }
}

/**
 * Update actuality.
 * @param {*} id Project ID to post actuality in
 * @param {*} actualityId Actuality ID to update
 * @param {*} actuality Actuality object
 * @param {*} activity Activity feed
 */

export const updateActuality = async (req, res) => {
    try {
        await ProjectModel.updateOne(
            {
                _id: req.params.id,
                actualities: {
                    $elemMatch: {
                        _id: req.params.actualityId
                    }
                }
            },
            {
                $set: {
                    "actualities.$.title": req.body.actuality.title,
                    "actualities.$.url": req.body.actuality.url,
                    "actualities.$.description": req.body.actuality.description
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        const errors = actualityErrors(err)
        res.status(200).json({ errors })
    }
}

/**
 * Delete actuality
 * @param {*} id Project ID
 * @param {*} actualityId Actuality ID to delete
 * @param {*} activity Activity feed
 */

export const deleteActuality = async (req, res) => {
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`

    if (fs.existsSync(__directory)) {
        fs.unlink(__directory, (err) => {
            if (err) console.error(err)
        })
    }

    try {
        await ProjectModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $pull: {
                    actualities: {
                        _id: req.params.actualityId
                    }
                },
                $addToSet: {
                    activity_feed: req.body.activity
                }
            },
            {
                new: true
            },
        )
            .then(docs => res.send(docs))
            .catch(err => {
                return res.status(500).send({ message: err })
            })
    }
    catch (err) {
        return res.status(400).json({ message: err });
    }
}

/**
 * Upload actuality pictures
 * @param {*} id Project ID
 * @param {*} actualityId Actuality ID
 * @param {*} req.files Actuality pictures
 */

export const uploadActualityPictures = async (req, res) => {
    //Lien du dossier où stocker les images
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`
    //Tableau a envoyer dans la BDD contenant ne lien vers chacune des images
    let pictures = []
    //Variable a incrémenter à chaque fois qu'un fichier est envoyé dans son dossier d'accueil (__directory)
    let done = 0

    //Verification que la requete contient des fichiers
    if (req.files) {
        //Verification si le dossier d'accueil des fichier existe déjà
        if (!fs.existsSync(__directory)) {
            //Création du dossier d'accueil si il n'existe pas déjà
            fs.mkdirSync(__directory, { recursive: true })
        }

        //Début de la loop pour chacun des fichiers
        req.files.map((file, key) => {
            //Variable du nom pour chacun des fichiers
            const fileName = `${req.params.actualityId}-${key}.jpg`;

            //Ajout du lien vers chacun des fichiers a envoyé dans la BDD
            pictures.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${fileName}`)

            //Promesse executée pour chacun des fichiers
            new Promise(async () => {
                //Envoi du fichier dans le dossier d'accueil avec son nom original
                await pipeline(file.stream, fs.createWriteStream(`${__directory}/${file.originalName}`))
                    .then(() => {
                        //Récupération du fichier dans le dossier d'accueil et compression
                        sharp(`${__directory}/${file.originalName}`)
                            //Sauvegarde des metadonnées
                            .withMetadata()
                            //Conversion en JPG
                            .jpeg({ mozjpeg: true, quality: 50 })
                            //Envoi du fichier et renommage compressé dans la dossier d'accueil
                            .toFile(`${__directory}/${fileName}`, (err) => {
                                if (err) {
                                    console.error(err)
                                } else {
                                    //Incrémentation de la variable
                                    done++
                                    //Si tous les fichier ont été traité, suppression des fichiers originaux
                                    if (done === req.files.length) {
                                        req.files.map((file, key) => {
                                            fs.unlink(`${__directory}/${file.originalName}`, (err) => {
                                                if (err) {
                                                    console.error(err)
                                                }
                                            })
                                        })
                                    }
                                }
                            })
                    })
            })
        })

        try {
            await ProjectModel.updateOne(
                {
                    _id: req.params.id,
                    actualities: {
                        $elemMatch: {
                            _id: req.params.actualityId
                        }
                    }
                },
                {
                    $set: {
                        "actualities.$.pictures": pictures
                    }
                },
                {
                    new: true
                },
            )
                .then(docs => res.send(docs))
                .catch(err => {
                    return res.status(500).send({ message: err })
                })
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    }
}

/**
 * Update actuality pictures.
 * @param {*} id Project ID
 * @param {*} actualityId Actuality ID
 * @param {*} req.files Actuality pictures
 */

export const updateActualityPictures = async (req, res) => {
    //Lien du dossier où stocker les images
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`
    //Tableau a envoyer dans la BDD contenant ne lien vers chacune des images
    let pictures = []

    //Verification que la requete contient des fichiers
    if (req.files) {
        //Variable a incrémenter à chaque fois qu'un fichier est envoyé dans son dossier d'accueil (__directory)
        let i = 0
        //Verification si le dossier d'accueil des fichier existe déjà
        if (!fs.existsSync(__directory)) {
            //Création du dossier d'accueil si il n'existe pas déjà
            fs.mkdirSync(__directory, { recursive: true })
        }

        const upload = req.files.map(async file => {
            //Incrémentation de la variable
            i++
            //Envoi du fichier dans le dossier d'accueil avec son nom original
            await pipeline(file.stream, fs.createWriteStream(`${__directory}/${file.originalName}`))
                .then(async () => {
                    //Récupération du fichier dans le dossier d'accueil et compression
                    await sharp(`${__directory}/${file.originalName}`)
                        //Sauvegarde des metadonnées
                        .withMetadata()
                        //Conversion en JPG
                        .jpeg({ mozjpeg: true, quality: 50 })
                        //Envoi du fichier et renommage compressé dans la dossier d'accueil
                        .toFile(`${__directory}/${file.originalName}.jpg`)
                        .then(() => {
                            //Suppression du fichier original
                            fs.unlink(`${__directory}/${file.originalName}`, (err) => {
                                if (err) {
                                    console.error(err)
                                }
                            })
                        })
                })
        })

        Promise.all(upload).then(() => {
            //Verification que tous les fichier ont été traités
            if (i === req.files.length) {
                //Lecture du contenu de dossier d'accueil
                const folder = readdirSync(__directory)
                //Loop de tous les fichiers
                folder.map((file, key) => {
                    //Ajout du lien vers chacun des fichiers a envoyé dans la BDD
                    pictures.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${req.params.actualityId}-${key}.jpg`)
                    //Renommage des tous les fichiers pour les classer dans l'ordre
                    fs.rename(`${__directory}/${file}`, `${__directory}/${req.params.actualityId}-${key}.jpg`, (err) => {
                        if (err) {
                            throw err
                        }
                    })
                })

                try {
                    ProjectModel.updateOne(
                        {
                            _id: req.params.id,
                            actualities: {
                                $elemMatch: {
                                    _id: req.params.actualityId
                                }
                            }
                        },
                        {
                            $set: {
                                "actualities.$.pictures": pictures
                            },
                            $addToSet: {
                                activity_feed: req.body.activity
                            }
                        },
                        {
                            new: true,
                            upsert: true
                        },
                    )
                        .then(docs => res.send(docs))
                        .catch(err => {
                            return res.status(500).send({ message: err })
                        })
                } catch (err) {
                    return res.status(400).send({ message: err })
                }
            }
        })
    }
}

/**
 * Delete actuality pictures
 * @param {*} req 
 * @param {*} res 
 */

export const deleteActualityPictures = async (req, res) => {
    //Lien du dossier où stocker les images
    const __directory = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}`
    //Tableau a envoyer dans la BDD contenant ne lien vers chacune des images
    let pictures = []

    //Verification si le dossier d'accueil des fichier existe déjà
    if (!fs.existsSync(__directory))
        //Création du dossier d'accueil si il n'existe pas déjà
        fs.mkdirSync(__directory, { recursive: true })

    //Loop pour tous les fichiers à supprimer
    const promise = req.body.deletedFiles.map(filename => {
        //Lien du fichier à supprimer
        let path = `${__dirname}/../../uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${filename}`
        //Supprssion du fichier
        fs.promises.unlink(path, (err) => {
            if (err) {
                console.error(err)
            }
        })
    })


    Promise.all(promise).then(() => {
        //Lecture du contenu de dossier d'accueil
        const folder = readdirSync(__directory);
        //Loop de tous les fichiers
        folder.map((file, key) => {
            //Nouveau nom pour chaque fichier
            const fileName = `${req.params.actualityId}-${key}.jpg`;
            //Ajout du lien vers chacun des fichiers a envoyé dans la BDD
            pictures.push(`${process.env.SERVER_URL}/uploads/projects/${req.params.id}/actualities/${req.params.actualityId}/${fileName}`)
            //Renommage des tous les fichiers pour les classer dans l'ordre
            fs.rename(`${__directory}/${file}`, `${__directory}/${req.params.actualityId}-${key}.jpg`, (err) => {
                if (err) {
                    throw err
                }
            })
        })
    }).then(async () => {
        console.log('coucou')
        try {
            await ProjectModel.updateOne(
                {
                    _id: req.params.id,
                    actualities: {
                        $elemMatch: {
                            _id: req.params.actualityId
                        }
                    }
                },
                {
                    $set: {
                        "actualities.$.pictures": pictures
                    },
                    $addToSet: {
                        activity_feed: req.body.activity
                    }
                },
                {
                    new: true,
                    upsert: true
                },
            )
                .then(docs => res.send(docs))
                .catch(err => {
                    return res.status(500).send({ message: err })
                })
        } catch (err) {
            return res.status(500).send({ message: err });
        }
    })
}