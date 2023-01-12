import LocationApiModel from './location.api.model.js';

export const getLocation = (req, res) => {
    LocationApiModel.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error to get data : ' + err)
        }
    })
}

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