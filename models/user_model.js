const mysql = require("mysql");


exports.fields = (req, res, hash) => {
    if (
        typeof req.body.login === "string" &&
        typeof hash === "string"

    ) {

        return {
            login: mysql.escape(req.body.login),
            password: mysql.escape(hash),
        }
    }
    else {
        return false
    }
}

exports.field_name = ["login", "password"]
