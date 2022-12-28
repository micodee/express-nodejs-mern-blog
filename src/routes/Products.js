const express = require('express')

const router = express.Router();

const productsControllers = require('../controllers/Products')

// CREATE => POST
router.post("/product", productsControllers.createProduct);
// READ => GET
router.get("/product", productsControllers.getAllProducts);

module.exports = router