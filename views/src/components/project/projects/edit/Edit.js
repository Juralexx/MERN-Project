import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateProject } from '../../../../actions/project.action'
import { ISOtoNavFormat, removeAccents } from '../../../Utils'
import { Button, OutlinedButton } from '../../../tools/components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Title from './Title'
import State from './State'
import End from './End'
import Location from './Location'
import Works from './Works'
import Content from './Content'
import Contributors from './Contributors'
import Description from './Description'
import Tags from './Tags'

const Edit = ({ project, user }) => {
    const [title, setTitle] = useState(project.title)
    const [subtitle, setSubtitle] = useState(project.subtitle)
    const [url, setUrl] = useState(project.URL)
    const [category, setCategory] = useState(project.category)
    const [tags, setTags] = useState(project.tags)
    const [location, setLocation] = useState(project.location)
    const [department, setDepartment] = useState(project.department)
    const [region, setRegion] = useState(project.region)
    const [newRegion, setNewRegion] = useState(project.new_region)
    const [description, setDescription] = useState(project.description)
    const [numberofcontributors, setNumberofcontributors] = useState(project.numberofcontributors)
    const [workArray, setWorkArray] = useState(project.works)
    const [end, setEnd] = useState(ISOtoNavFormat(project.end))
    const [content, setContent] = useState(project.content[0].ops)
    const [state, setState] = useState(project.state)
    const [changes, setChanges] = useState(false)
    const [error, setError] = useState(null)
    const [isErr, setErr] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdate = async () => {
        if (title === "" || title.length < 10 || title.length > 60) {
            setErr("title")
            setError("Veuillez saisir un titre valide, votre titre doit faire entre 10 et 60 caractères")
        } else if (subtitle === "" || subtitle.length < 10 || subtitle.length > 100) {
            setErr("subtitle")
            setError("Veuillez saisir un sous-titre valide, votre sous-titre doit faire entre 10 et 100 caractères")
        } else if (category === "") {
            setErr("category")
            setError("Veuillez saisir une catégorie")
        } else if (description === "" || description.length < 10 || description.length > 300) {
            setErr("description")
            setError("Veuillez ajouter une courte description à votre projet")
        } else if (numberofcontributors < 0 || numberofcontributors === (null || undefined)) {
            setErr("numberofcontributors")
            setError("Veuillez indiquer de combien de personne vous avez besoin, si vous ne savez pas merci de l'indiquer")
        } else if (content === "" || content.length < 10 || content.length > 10000) {
            setErr("content")
            setError("Veuillez saisir une description valide, votre description doit faire entre 10 et 10 000 caractères")
        } else {
            if (title !== project.title) {
                let cleanTitle = title.toLowerCase();
                cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
                cleanTitle = cleanTitle.replace(/[&#,+()$~%^.'":*?!;<>{}/\\\\]/g, " ")
                cleanTitle = cleanTitle.replace(/ +/g, " ")
                cleanTitle = cleanTitle.trim()
                setTitle(cleanTitle)

                let URL = cleanTitle.toLowerCase();
                URL = removeAccents(URL)
                URL = URL.replace(/ /g, "-")
                setUrl(URL)
            }

            await axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}api/project/${project._id}`,
                data: {
                    title: title,
                    URL: url,
                    subtitle: subtitle,
                    category: category,
                    description: description,
                    tags: tags,
                    state: state,
                    location: location,
                    department: department,
                    region: region,
                    new_region: newRegion,
                    end: end,
                    content: content,
                    numberofcontributors: numberofcontributors,
                    works: workArray,
                }
            }).then(async res => {
                if (res.data.errors) {
                    if (res.data.errors.title) setError(res.data.errors.title)
                    else if (res.data.errors.category) setError(res.data.errors.category)
                    else if (res.data.errors.content) setError(res.data.errors.content)
                    else if (res.data.errors.numberofcontributors) setError(res.data.errors.numberofcontributors)
                } else {
                    dispatch(updateProject(project._id, title, URL, subtitle, category, tags, state, location, department, region, newRegion, description, numberofcontributors, end, workArray, content))
                    const redirection = navigate(`/projects/${project.URLID}/${project.URL}/about`)
                    setTimeout(redirection, 2000)
                }
            }).catch(err => console.log(err))
        }
    }

    return (
        <div className="edit-project">
            <div className="edit-project-container">
                <div className="header flex justify-between mb-5">
                    <h2>Modification du projet</h2>
                    <div className="flex">
                        <Link to={`/projects/${project.URLID}/${project.URL}/about`}><OutlinedButton text="Annuler" className="mx-2" /></Link>
                        <Button text="Enregistrer" onClick={handleUpdate} disabled={title === project.title && subtitle === project.subtitle && category === project.category && description === project.description && state === project.state && location === project.location && end === ISOtoNavFormat(project.end) && JSON.stringify(workArray) === JSON.stringify(project.works) && !changes} />
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>Titre du projet</h2>
                            <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                            <h2>Sous-titre du projet</h2>
                            <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                            <h2>Catégorie</h2>
                            <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <Title
                                title={title}
                                setTitle={setTitle}
                                subtitle={subtitle}
                                setSubtitle={setSubtitle}
                                category={category}
                                setCategory={setCategory}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>Courte description du projet</h2>
                            <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <Description
                                description={description}
                                setDescription={setDescription}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>Tags et référencement</h2>
                            <p>Choisissez un titre et un sous-titre clair pour aider votre public à comprendre votre projet rapidement.
                                Ces deux éléments sont visibles sur vous page de pré-lancement et de projet.</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <Tags
                                tags={tags}
                                setTags={setTags}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>État du projet</h2>
                            <p>La catégorie et la sous-catégorie principales permettent à vos contributeurs de trouver votre projet.</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <State
                                state={state}
                                setState={setState}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>Lieu du projet</h2>
                            <p>Saisissez l'emplacement géographique qui correspond au mieux à votre projet.</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <Location
                                location={location}
                                setLocation={setLocation}
                                department={department}
                                setDepartment={setDepartment}
                                region={region}
                                setRegion={setRegion}
                                newRegion={newRegion}
                                setNewRegion={setNewRegion}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>Date de fin prévu (facultatif)</h2>
                            <p>Vous recevrez des conseils quant au moment où les étapes qui durent plusieurs jours doivent être terminées.
                                Cette date reste modifiable jusqu'au moment où vous lancez votre projet (ce qui se fait manuellement).</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <End
                                end={end}
                                setEnd={setEnd}
                            />
                        </div>
                    </div>
                </div>
                <div className="edit-container">
                    <div className="edit-project-flex-container">
                        <div className="edit-project-flex-content-left">
                            <h2>Nombre de personnes et compétences recherchées</h2>
                            <p>Saisissez l'emplacement géographique qui correspond au mieux à votre projet.</p>
                            <p>Les contributeurs potentiels les verront aussi si votre projet apparaît dans les différentes catégories,
                                les résultats de recherche ou les e-mails que nous envoyons à notre communauté.</p>
                        </div>
                        <div className="edit-project-flex-content-right">
                            <Contributors
                                numberofcontributors={numberofcontributors}
                                setNumberofcontributors={setNumberofcontributors}
                                isErr={isErr}
                                setErr={setErr}
                                error={error}
                                setError={setError}
                            />
                        </div>
                    </div>
                    <Works
                        workArray={workArray}
                        setWorkArray={setWorkArray}
                        isErr={isErr}
                        setErr={setErr}
                        error={error}
                        setError={setError}
                    />
                </div>
                <div className="edit-container">
                    <h2>Description</h2>
                    <p>Décrivez ce que vous souhaitez financier en évoquant l'importance que votre projet revêt à vos yeux et comment vous comptez le réaliser.
                        Parlez aussi un peu de vous. Une description complète informe les contributeurs sur l'ensemble de votre projet.
                        Si possible, ajoutez des images pour montrer votre travail et les récompenses que vous comptez produire.</p>
                    <Content
                        content={content}
                        setContent={setContent}
                        changes={changes}
                        setChanges={setChanges}
                    />
                </div>
            </div>
        </div>
    )
}

export default Edit