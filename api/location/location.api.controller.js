import LocationApiModel from './location.api.model.js';

/**
 * Get all locations
 */

export const getLocations = (req, res) => {
    LocationApiModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

/**
 * Get location by name
 */

export const getLocation = (req, res) => {
    LocationApiModel.findOne({
        COM_NOM: req.params.location,
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
 * Find location from query
 */

export const findLocation = (req, res) => {
    const query = req.params.query
    LocationApiModel.find({
        COM_NOM: {
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
        .limit(15)
}