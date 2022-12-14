const mysql = require("mysql");


exports.fields = (req, res, hash) => {
    if (
        typeof req.body.title === "string" &&
        typeof req.body.description === "string" &&
        typeof req.body.content === "string" &&
        typeof req.body.main_image === "number" &&
        typeof req.body.category === "string" &&
        typeof req.body.id_user === "number"
    ) {
        return {
            title: mysql.escape(req.body.title),
            description: mysql.escape(req.body.description),
            content: mysql.escape(req.body.content),
            main_image: mysql.escape(req.body.main_image),
            category: mysql.escape(req.body.category),
            id_user: mysql.escape(req.body.id_user)
        }
    }
    else {
        return false
    }
}

exports.field_name = ["title", "description", "content", "main_image", "category", "id_user"]
