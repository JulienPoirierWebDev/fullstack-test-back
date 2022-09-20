const User = require('../models/user_model');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const queryFunction = require("../database/queries");
const getPool = require("../database/connexion");
const RowDataPacket = require("mysql/lib/protocol/packets/RowDataPacket");

const pool= getPool()


const table = "users";


exports.signup = (req, res, next) => {
    console.log(req.body)
    try {
        let query = "SELECT * FROM users WHERE login = "+ pool.escape(req.body.login);
        pool.query(query, (err, result) => {
            if (err) {
                res.status(404).json(err)
            }
            else if (!err) {
                console.log("Already email :" , result)
                console.log(result.length)
                if(result.length === 0) {
                    bcrypt.hash(req.body.password, 10)
                        .then(hash => {
                            let fields = User.fields(req, res, hash)
                            console.log(fields)

                            if (!fields) {
                                res.status(403).send("Contenu interdit")
                            } else {
                                let values_string = queryFunction.postValues(fields)
                                console.log(values_string)
                                queryFunction.insertOne(req, res, table, values_string)
                            }

                        })
                } else {
                    res.status(409).json({
                        message:"L'adresse email est deja utilisé. Merci d'en choisir une autre."
                    })
                }
            }

        })
    } catch (err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }


}

exports.login = (req, res, next) => {
    try {
        let query = "SELECT * FROM "+ table +" WHERE login ="+  pool.escape(req.body.login)
        pool.query( query, (err, result) => {
            if (err) {
                res.status(404).json(err)
            }
            else if (!result[0]) {
                res.status(404).json({error:"Utilisateur inconnu"})
            }
            else if (!err && result) {
                bcrypt.compare(req.body.password, result[0].password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({message: 'Mot de passe incorrect !'});
                        }

                        res.status(200).json({
                            userId: result[0]['id'],
                            token: jwt.sign(
                                { userId: result[0]['id']},
                                process.env.PRIVATE_KEY,
                                { expiresIn:'24h'}
                            )
                        });
                    })
                    .catch(error => res.status(500).json({error}))

            }

        })
    }
    catch (err) {
        res.status(500).json({
            message:"Erreur interne",
            err
        })
    }

}

exports.authenticated = (req, res, next) => {
    try{
        let token = req.body.token;
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY)

        res.json({token:token, decoded:decodedToken})

    }
    catch (err) {
        res.status(401).json({
            error: true,
            err: err
        })
    }
}
