const mysql = require("mysql");


exports.fields = (req, res) => {
    if (
        typeof req.body.name === "string" &&
        typeof req.file.path === "string" &&
        typeof req.body.alt === "string" &&
        typeof req.body.id_user === "string"

) {
        return {
            name: mysql.escape(req.body.name),
            image: mysql.escape(req.file.path),
            alt: mysql.escape(req.body.alt),
            id_user:escape(req.body.id_user)
        }
    }
    else {
        return false
        }
}

exports.field_name = ["name","image", "alt", "id_user"]
