const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
        const id_user = decodedToken.userId;
        if(!req.body.id_user) {
            res.status(401).json({
                error: "UserId missing"
            });
        } else {
            if (req.body.id_user && req.body.id_user !== id_user) {
                throw 'Invalid user ID';
            } else {
                next();
            }
        }
    }
    catch {
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
}

