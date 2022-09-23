const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth")


const item_controller = require("../controllers/item_controller");

router.post('/', auth, item_controller.createOneItem);

router.get('/', item_controller.getAllItem);

router.get('/:id([0-9]{1,})', item_controller.getOneItem);

router.put('/:id([0-9]{1,})', auth, item_controller.modifyOneItem);

router.delete('/:id', auth, item_controller.deleteOneItem);

router.get('/pagination/:pagination([0-9]{1,})', item_controller.getPagination)

router.get('/get_categories', item_controller.getCategories)

module.exports = router;
