const express = require('express');

const userRoutes = require("./routes/user_routes")
const imageRoutes = require("./routes/image_routes")
const itemRoutes = require("./routes/item_routes")



const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/item', itemRoutes);
app.use('/uploads', express.static('./uploads'));



app.use((req, res, next) => {
    res.status(404).send("404")
})




module.exports = app;
