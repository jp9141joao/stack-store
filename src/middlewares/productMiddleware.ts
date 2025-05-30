import { Request, Response, NextFunction } from "express";
import { HttpResult } from "../utils/httpResult";
import mongoose, { mongo } from "mongoose";
import { ProductDTO } from "../types/types";

export const CheckProductId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json(HttpResult.Fail("Invalid Product ID format!"));
        return;
    }

    next();
}

export const CheckParameters = (req: Request, res: Response, next: NextFunction) => {
    const { param } = req.body;
    
    if (!param) {
        res.status(400).json(HttpResult.Fail("Product ID or name is required!"));
        return;
    }

    if (!mongoose.Types.ObjectId.isValid(param) && typeof param !== 'string') {
        res.status(400).json(HttpResult.Fail("Invalid Product ID or name format!"));
        return;
    }

    next();
}

export const CheckProductData = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, color, weight, type, price, dateRegister } = req.body as Partial<ProductDTO>;
    
    if (!id && !name) {
        res.status(400).json("Product name is required!");
        return;
    } else if (name && (typeof name !== 'string' || name.length < 5)) {
        res.status(400).json(HttpResult.Fail("Product name must be at least 5 characters long!"));
        return;
    }   

    if (!id && !description) {
        res.status(400).json(res.status(400).json(HttpResult.Fail("Product description is required!")));
        return;
    } else if (description && (typeof description !== 'string' || description.length < 10)) {
        res.status(400).json(HttpResult.Fail("Product description must be at least 10 caracters long!"));
        return;
    }

    if (!id && !color) {
        res.status(400).json(HttpResult.Fail("Product color is required!"));
        return;
    } else if (color && (typeof color !== 'string' || color.length < 3)) {
        res.status(400).json(HttpResult.Fail("Product color must be at least 3 caracters long!"));
        return;
    }

    if (!id && !weight) {
        res.status(400).json(HttpResult.Fail("Product weight is required!"));
        return;
    } else if (weight && (typeof weight !== 'number' || weight < 0)) {
        res.status(400).json(HttpResult.Fail("Product weight must be greater than zero!"));
        return;
    }

    if (!id && !type) {
        res.status(400).json(HttpResult.Fail("Product type is required!"));
        return;
    } else if (type && (typeof type !== 'string' || type.length < 3)) {
        res.status(400).json(HttpResult.Fail("Product type must be at least 3 caracters long!"));
        return;
    }

    if (!id && !price) {
        res.status(400).json(HttpResult.Fail("Product price is required!"));
        return;
    } else if (price && (typeof price !== 'number' || price < 0)) {
        res.status(400).json(HttpResult.Fail("Product price must be greater than zero!"));
        return;
    }

    const currentDate = new Date();

    if (!id && !dateRegister) {
        res.status(400).json(HttpResult.Fail("Product date register is required!"));
        return;
    } else if (dateRegister && (typeof dateRegister !== 'string' || !Date.parse(dateRegister) || new Date(dateRegister) > currentDate)) {
        res.status(400).json(HttpResult.Fail("Product date register must be a valid date!"));
        return;
    }

    next();
}


