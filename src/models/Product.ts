import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    description: String,
    color: String,
    weight: Number,
    type: String,
    price: Number,
    dateRegister: Date
});

const Product = mongoose.model( 'Product', productSchema );

export default Product;