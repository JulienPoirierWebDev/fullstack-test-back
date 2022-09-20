const multer = require('multer');

const queryFunction = require("../database/queries")
const image_model = require("../models/image_model")

const table = "images";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        let type;
        if(file.mimetype === "image/png") {
            type = ".png"
        } else if(file.mimetype === "image/jpeg") {
            type = ".jpg"
        } else if(file.mimetype === "application/pdf") {
            type = ".pdf"
        } else if(file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            type = ".docx"
        } else if(file.mimetype === "application/msword") {
            type = ".doc"
        } else if(file.mimetype === "text/csv") {
            type = ".csv"
        } else if(file.mimetype === "application/vnd.ms-excel") {
            type = ".xls"
        } else if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            type = ".xlsx"
        }

        let name;
        if(typeof req.body.name !== "undefined") {
            name = req.body.name.replace(" ", "-").toLowerCase()
        }
        const uniqueSuffix = Date.now() + "-" + name + type
        cb(null, uniqueSuffix)


    }
});




exports.createOneImage = (req, res, next) => {
    try{
        let fields = image_model.fields(req, res)
        if (!fields) {

            res.status(403).send("Contenu interdit")

        } else {

            let values_string = queryFunction.postValues(fields)
            queryFunction.insertOne(req, res, table, values_string)

        }
    } catch (err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }


}


exports.getAllImage = (req, res, next) => {
    try {
        queryFunction.queryGetAll(res, table)
    }
    catch (err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }
}

exports.getOneImage = (req, res, next) => {
    try {

        queryFunction.queryGetOne(req, res, table)
    }
    catch (err) {
            res.status(500).json({
                message:"Erreur interne",
                err
            })
        }
}


exports.deleteOneImage = (req, res, next) => {
    try {
        queryFunction.deleteOne(req, res, table)
    }
    catch(err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }
}

exports.uploadImg = multer({storage: storage}).single('image');

