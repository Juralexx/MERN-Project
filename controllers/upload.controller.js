const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/error.utils");

module.exports.uploadProfil = async (req, res) => {
    try {
        if (req.file.detectedMimeType != "image/jpg" && req.file.detectedMimeType != "image/png" && req.file.detectedMimeType != "image/jpeg") {
            throw Error("invalid file");
        }
        if (req.file.size > 500000)  {
            throw Error("max size");
        }
    } 
    catch (err) {
        const errors = uploadErrors(err);
        return res.status(201).json({ message: errors });
    }
    
    const fileName = req.body.userId + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../views/public/uploads/profil/${fileName}`
        )
    );

    try {
        UserModel.findByIdAndUpdate(
            req.body.userId,
            { $set: { picture: "./uploads/profil/" + fileName } },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                }
                else {
                    return res.status(500).send({ message: err });
                }
            }
        );
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};