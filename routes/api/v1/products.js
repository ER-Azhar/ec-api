const express = require("express");
const router = express.Router();
const productController = require("../../../controllers/api/v1/products_controller");

// handle requests
// create a product using products_controller.js
router.post("/create", productController.create);
// get all products
 router.get("/", productController.getProducts);
// delete all products with a given id
router.delete("/:productId", productController.deleteProduct);
// update a product
router.post("/:productId/update_quantity", productController.updateQuantity);


module.exports = router;