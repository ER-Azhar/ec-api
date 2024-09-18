const mongoose = require("mongoose");

// creating product schema
const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

//exporting productSchema as Produt
const Product = new mongoose.model('Product', productSchema);
module.exports = Product;
