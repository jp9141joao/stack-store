"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    id: String,
    name: String,
    description: String,
    color: String,
    weight: Number,
    type: String,
    price: Number,
    dateRegister: Date
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
