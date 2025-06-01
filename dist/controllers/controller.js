"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductByIdOrName = exports.getProducts = void 0;
const httpResult_1 = require("../utils/httpResult");
const Product_1 = __importDefault(require("../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
const getProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find();
        res.status(200).json(httpResult_1.HttpResult.Success(products.length > 0 ? products : 'No products exist yet!'));
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json(httpResult_1.HttpResult.Fail("An unexpected error occurred while fetching products!"));
        return;
    }
};
exports.getProducts = getProducts;
const getProductByIdOrName = async (req, res) => {
    const { param } = req.params;
    let product;
    try {
        if (mongoose_1.default.Types.ObjectId.isValid(param)) {
            product = await Product_1.default.find({ _id: param });
        }
        else {
            product = await Product_1.default.find({ name: param });
        }
        if (!product) {
            res.status(404).json(httpResult_1.HttpResult.Fail("Product not found!"));
            return;
        }
        res.status(200).json(httpResult_1.HttpResult.Success(product.length > 0 ? product : 'No product was found with this parameter!'));
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json(httpResult_1.HttpResult.Fail("An unexpected error occurred while fetching product!"));
        return;
    }
};
exports.getProductByIdOrName = getProductByIdOrName;
const createProduct = async (req, res) => {
    const { name, description, color, weight, type, price, dateRegister } = req.body;
    try {
        await Product_1.default.create({
            name,
            description,
            color,
            weight,
            type,
            price,
            dateRegister
        });
        res.status(201).json(httpResult_1.HttpResult.Success(`Product created successfully!`));
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json(httpResult_1.HttpResult.Fail("An unexpected error occurred while creating product!"));
        return;
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const allowedFields = [
        'name',
        'description',
        'color',
        'weight',
        'type',
        'price',
        'dateRegister'
    ];
    let newData = {};
    for (const key of allowedFields) {
        const value = req.body[key];
        if (value !== undefined && value !== null) {
            newData[key] = value;
        }
    }
    try {
        const product = await Product_1.default.findByIdAndUpdate(id, { $set: newData }, { new: true, runValidators: true });
        if (!product) {
            res.status(404).json(httpResult_1.HttpResult.Fail("Product not found!"));
            return;
        }
        res.status(200).json(httpResult_1.HttpResult.Success("Product updated successfully!"));
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json(httpResult_1.HttpResult.Fail("An unexpected error occurred while updating product!"));
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product_1.default.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json(httpResult_1.HttpResult.Fail("Product not found!"));
            return;
        }
        res.status(200).json(httpResult_1.HttpResult.Success("Product deleted successfully!"));
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json(httpResult_1.HttpResult.Fail("An unexpected error occurred while deleting product"));
        return;
    }
};
exports.deleteProduct = deleteProduct;
