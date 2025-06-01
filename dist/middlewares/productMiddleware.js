"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckProductData = exports.CheckParameters = exports.CheckProductId = void 0;
const httpResult_1 = require("../utils/httpResult");
const mongoose_1 = __importDefault(require("mongoose"));
const CheckProductId = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Invalid Product ID format!"));
        return;
    }
    next();
};
exports.CheckProductId = CheckProductId;
const CheckParameters = (req, res, next) => {
    const { param } = req.params;
    if (!param) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product ID or name is required!"));
        return;
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(param) && typeof param !== 'string' || (typeof param === 'string' && param.length < 3)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Invalid Product ID or name format!"));
        return;
    }
    next();
};
exports.CheckParameters = CheckParameters;
const CheckProductData = (req, res, next) => {
    const { id } = req.params;
    const { name, description, color, weight, type, price, dateRegister } = req.body;
    if (!id && !name) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product name is required!"));
        return;
    }
    else if (name && (typeof name !== 'string' || name.length < 5)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product name must be at least 5 characters long!"));
        return;
    }
    if (!id && !description) {
        res.status(400).json(res.status(400).json(httpResult_1.HttpResult.Fail("Product description is required!")));
        return;
    }
    else if (description && (typeof description !== 'string' || description.length < 10)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product description must be at least 10 caracters long!"));
        return;
    }
    if (!id && !color) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product color is required!"));
        return;
    }
    else if (color && (typeof color !== 'string' || color.length < 3)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product color must be at least 3 caracters long!"));
        return;
    }
    if (!id && !weight) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product weight is required!"));
        return;
    }
    else if (weight && (typeof weight !== 'number' || weight < 0)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product weight must be greater than zero!"));
        return;
    }
    if (!id && !type) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product type is required!"));
        return;
    }
    else if (type && (typeof type !== 'string' || type.length < 3)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product type must be at least 3 caracters long!"));
        return;
    }
    if (!id && !price) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product price is required!"));
        return;
    }
    else if (price && (typeof price !== 'number' || price < 0)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product price must be greater than zero!"));
        return;
    }
    const currentDate = new Date();
    if (!id && !dateRegister) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product date register is required!"));
        return;
    }
    else if (dateRegister && (typeof dateRegister !== 'string' || !Date.parse(dateRegister) || new Date(dateRegister) > currentDate)) {
        res.status(400).json(httpResult_1.HttpResult.Fail("Product date register must be a valid date!"));
        return;
    }
    next();
};
exports.CheckProductData = CheckProductData;
