const express = require('express');

const userRoutes = require("./routes/user_routes")


const app = express();



app.use((req, res, next) => {
    res.status(404).send("404")
})




module.exports = app;
