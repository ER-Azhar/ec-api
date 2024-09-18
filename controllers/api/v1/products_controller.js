// importing the product model
const Product = require("../../../models/product");
const mongoose = require("mongoose");

// exporting different controllers
// create a product through route "/api/v1/products/create"
module.exports.create = function (req, res, next) {
    // creating product
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        quantity: req.body.quantity
    });

    // saving product
    product
        .save()
        .then((product) => {
            console.log("Produt created successfully", product);
            res.status(200).json({
                message: "product created successfully",
                success: true,
                data: {
                    product: {
                        name: product.name,
                        quantity: product.quantity
                    }
                }
            })
        })
        .catch((err) => {
            console.log("Error in creating product :: ", err);
            res.status(500).json({
                message: "cannot create product"
            })
        })
}

// get all products through route "/api/v1/products"
module.exports.getProducts = function (req, res, next) {
    Product
        .find({})
        .select("_id name quantity")
        .exec()
        .then((products) => {
            res.status(200).json({
                success: true,
                data: {
                    products: products
                }
            });
        })
        .catch((err) => {
            console.log("Error in getting products :: ", err);
            res.status(500).json({
                error: err
            });
        })
}

// delete a product through route "/api/v1/products/:id"
// module.exports.deleteProduct = function (req, res, next) {
//     const id = req.params.productId;
//     Product
//         .deleteMany({ _id: id })
//         .exec()
//         .then((product) => {
//             res.status(200).json({
//                 success: true,
//                 message: "Product deleted successfully",
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// }

module.exports.deleteProduct = function (req, res, next) {
    const id = req.params.productId;

    Product
        .deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
            res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            });
        })
        .catch(err => {
            console.error(err); // Use console.error for error logging
            res.status(500).json({
                success: false,
                message: "An error occurred while deleting the product",
                error: err.message // Send a more user-friendly error message
            });
        });
}

// update product quantity using route "/api/v1/products/:productId/update_quantity/?number=10"
module.exports.updateQuantity = async function (req, res, next) {

    const id = req.params.productId;

    const product = await Product.findById(id);
    const number = req.query.number;
    console.log(product, number);
    try {
        if (product) {
            const update = parseInt(number);
            // check if net value after increment/decrement is positive else give message
            if (product.quantity + update >= 0) {
                product.quantity = update; //product.quantity = product.quantity + update;
                product.save();
                res.status(200).json({
                    message: "Product updated successfully",
                    data: {
                        name: product.name,
                        updated_quantity: product.quantity
                    }
                })
            } else {
                res.status(200).json({
                    message: "The quantity to be decremented is greater than existing quantity"
                })
            }
        } else {
            console.log("Invalid product Id")
            res.status(200).json({
                message: "Invalid product Id"
            })
        }
    } catch (err) {
        console.log("Error updating :: ", err);
        res.status(500).json({
            error: err
        })
    }

}