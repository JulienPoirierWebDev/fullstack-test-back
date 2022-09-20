const express = require('express');

const userRoutes = require("./routes/user_routes")
const imageRoutes = require("./routes/image_routes")



const app = express();

app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);



app.use((req, res, next) => {
    res.status(404).send("404")
})




module.exports = app;
