import GeolocationApiModel from './geolocations.api.model.js'

export const getGeolocation = (req, res) => {
    GeolocationApiModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    }).limit(15)
}

export const findGeolocation = (req, res) => {
    GeolocationApiModel.findOne({ 'properties.nom': req.params.location },
        (err, docs) => {
            if (!err) {
                res.send(docs)
            } else {
                console.log(err)
            }
        })
}

