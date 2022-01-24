import mongoose from 'mongoose'
import WorkApiModel from './workapi.model.js';

export const getWorks = (req, res) => {
    WorkApiModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

export const findWork = (req, res) => {
    const query = req.params.query
    WorkApiModel.find({ appelation_metier: { $regex: query, $options: "i" } },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log(err)
            }
        })
        .limit(10)
};