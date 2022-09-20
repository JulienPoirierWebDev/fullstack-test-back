const getPool = require("../database/connexion")
const pool= getPool()

exports.queryGetAll = (res, table) => {

    let query = "SELECT * FROM " + table + " ORDER BY id DESC";
    pool.query(query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        }
        else if (!err) {
            res.status(200).json(result)
        }

    })

}

exports.queryGetOne = (req, res, table) => {


    let query = "SELECT * FROM "+ table +" WHERE id ="+  req.params.id
    pool.query( query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        }
        else if (!result[0]) {
            res.status(404).send("No result")
        }
        else if (!err && result) {
            res.status(200).json(result)
        } else {
            res.status(204)
        }


    })

}

exports.queryGetCustom = (req, res, table) => {


    let query = "SELECT * FROM "+ table +" WHERE "+ req.params.field +" ="+  req.params.value
    pool.query( query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        }
        else if (!result[0]) {
            res.status(404).send("No result")
        }
        else if (!err && result) {
            res.status(200).json(result)
        } else {
            res.status(204)
        }


    })

}


exports.insertOne = (req, res, table, values_string) => {

    let query = "INSERT INTO " + table + " VALUES('', " + values_string +")";
    console.log(query)
    pool.query(query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        }
        else if (!err) {
            res.status(201).json(result)
        }  else {
            res.status(204)
        }

    })
}

exports.updateOne = (req, res, table, values_string) => {
    let query = "UPDATE " + table + " SET " + values_string + " WHERE id =" + req.params.id;

    pool.query(query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else if (!err && result) {
            res.status(200).json(result)
        } else {
            res.status(204)
        }

    })

}

exports.deleteOne = (req, res, table) => {
    let query = "DELETE FROM " + table + " WHERE id =" + req.params.id;

    pool.query(query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else if (!err) {
            res.status(200).json(result)
        } else {
            res.status(204)
        }

    })
}

exports.deleteCustom = (req, res, table) => {
    let query = "DELETE FROM " + table + " WHERE " + req.params.field +" = " + req.params.value;

    pool.query(query, (err, result) => {
        if (err) {
            res.status(404).json(err)
        } else if (!err) {
            res.status(200).json(result)
        } else {
            res.status(204)
        }

    })
}


exports.postValues = (fields) => {
    let values = Object.values(fields)

    let values_string = "";

    values.forEach((item) => {
        if(values.indexOf(item) === values.length-1) {
            values_string += item

        } else {
            values_string += item + ",";
        }
    })
    console.log(values_string)

    return values_string;
}

exports.updateValues = (fields, field_names) => {
    let values = Object.values(fields)
    let values_string = "";

    values.forEach((item) => {
        if(values.indexOf(item) === values.length-1) {
            values_string += (field_names[values.indexOf(item)] +" = " +item)

        } else {
            values_string += (field_names[values.indexOf(item)] + " = " +item + ",")
        }
    })

    return values_string;
}
