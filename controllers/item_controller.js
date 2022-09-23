const queryFunction = require("../database/queries")
const item_model = require("../models/item_model")
const getPool = require("../database/connexion")
const jwt = require("jsonwebtoken");
const pool= getPool()
const table = "items";


exports.createOneItem = (req, res, next) => {
    try{
        let fields = item_model.fields(req, res)
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


exports.getAllItem = (req, res, next) => {
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

exports.getOneItem = (req, res, next) => {
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

exports.modifyOneItem = (req, res, next) => {
    try {

        let query = "SELECT * FROM "+ table +" WHERE id ="+  req.params.id
        pool.query( query, (err, result) => {
            if (err) {
                res.status(404).json(err)
            }
            else if (!result[0]) {
                res.status(404).send("No result")
            }
            else if (!err && result) {
                let item_id_user = result[0].id_user
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
                const token_id_user = decodedToken.userId;
                if(item_id_user === token_id_user) {
                    let fields = item_model.fields(req, res)
                    if (!fields) {

                        res.status(403).send("Contenu interdit")

                    } else {

                        let values_string = queryFunction.updateValues(fields, item_model.field_name)
                        queryFunction.updateOne(req, res, table, values_string)
                    }
                } else {
                    res.status(403).send("Vous n'avez pas l'autorisation")

                }

            } else {
                res.status(204)
            }


        })




    }
    catch (err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }}

exports.deleteOneItem = (req, res, next) => {
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

exports.getPagination = (req, res) => {

    try{

    } catch (err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }

    let nb_items = 10;
    let pagination = (req.params.pagination - 1) *  nb_items



    let query = "SELECT * FROM items LIMIT " + nb_items + " OFFSET " + pagination


    pool.query( query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        }
        else if (!result[0]) {
            res.status(404).send("No result")
        }
        else if (!err && result) {
            res.json(result)

        } else {
            res.status(204)
        }


    })

}

exports.getCategories = (req, res) => {
    res.status(200).json({
        categories: ["fantasy", "science-fiction", "thriller", "horreur", "érotique", "policier", "romance"]
    })
}

