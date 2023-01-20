import WorkApiModel from './work.api.model.js';

/**
 * Get all works
 */

export const getWorks = (req, res) => {
    WorkApiModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

/**
 * Get work by name
 */

export const getWork = (req, res) => {
    WorkApiModel.findOne({
        appelation_metier: req.params.work,
    },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log('Unknown URL : ' + err)
            }
        }).select()
}

/**
 * Find work from query
 */


export const findWork = (req, res) => {
    const query = req.params.query
    WorkApiModel.find({
        appelation_metier: {
            $regex: query,
            $options: "i"
        }
    },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log(err)
            }
        })
        .limit(40)
};