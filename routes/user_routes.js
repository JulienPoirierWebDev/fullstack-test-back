const express = require("express");
const router = express.Router();


const users_controller = require("../controllers/user_controller");

router.post('/login', users_controller.login);

router.post('/sign', users_controller.signup);

router.post('/is_authenticated', users_controller.authenticated);


module.exports = router;
