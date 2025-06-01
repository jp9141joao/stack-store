import { Request, Response, NextFunction } from "express";           
import { HttpResult } from "../utils/httpResult";                     
import mongoose, { mongo } from "mongoose";                            
import { ProductDTO } from "../types/types";                        

export const CheckProductId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Extract 'id' parameter from the route

    // Verify that the provided 'id' is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        // If invalid, return 400 Bad Request with a failure message
        res.status(400).json(HttpResult.Fail("Invalid Product ID format!"));
        return; // Stop further processing
    }

    next(); // If valid, proceed to the next middleware or route handler
}

export const CheckParameters = (req: Request, res: Response, next: NextFunction) => {
    const { param } = req.params; // Extract 'param' which could be an ID or name

    // Ensure that 'param' exists in the request parameters
    if (!param) {
        res.status(400).json(HttpResult.Fail("Product ID or name is required!"));
        return;
    }

    // If 'param' is not a valid ObjectId AND not a string,
    // OR if it's a string shorter than 3 characters, reject it
    if (
        (!mongoose.Types.ObjectId.isValid(param) && typeof param !== 'string') ||
        (typeof param === 'string' && param.length < 3)
    ) {
        res.status(400).json(HttpResult.Fail("Invalid Product ID or name format!"));
        return; // Stop further processing on invalid format
    }

    next(); // If validation passes, proceed
}

export const CheckProductData = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // Extract 'id' from route parameters (if present)
    const {
        name,
        description,
        color,
        weight,
        type,
        price,
        dateRegister
    } = req.body as Partial<ProductDTO>; // Destructure fields from request body as partial ProductDTO

    // If neither 'id' nor 'name' is provided, product name is required for creation
    if (!id && !name) {
        res.status(400).json(HttpResult.Fail("Product name is required!"));
        return;
    } else if (name && (typeof name !== 'string' || name.length < 5)) {
        // If 'name' is provided but is not a string with at least 5 characters, reject it
        res.status(400).json(HttpResult.Fail("Product name must be at least 5 characters long!"));
        return;
    }

    // Description must be present for creation (when 'id' is not specified)
    if (!id && !description) {
        res.status(400).json(HttpResult.Fail("Product description is required!"));
        return;
    } else if (description && (typeof description !== 'string' || description.length < 10)) {
        // If 'description' is provided but is too short, reject it
        res.status(400).json(HttpResult.Fail("Product description must be at least 10 characters long!"));
        return;
    }

    // Color must be present for creation or must meet minimum length requirements
    if (!id && !color) {
        res.status(400).json(HttpResult.Fail("Product color is required!"));
        return;
    } else if (color && (typeof color !== 'string' || color.length < 3)) {
        // If 'color' is provided but has fewer than 3 characters, reject it
        res.status(400).json(HttpResult.Fail("Product color must be at least 3 characters long!"));
        return;
    }

    // Weight must be present for creation or must be a positive number
    if (!id && !weight) {
        res.status(400).json(HttpResult.Fail("Product weight is required!"));
        return;
    } else if (weight && (typeof weight !== 'number' || weight < 0)) {
        // If 'weight' is provided but not a non-negative number, reject it
        res.status(400).json(HttpResult.Fail("Product weight must be greater than zero!"));
        return;
    }

    // Type must be present for creation or must meet minimum length requirements
    if (!id && !type) {
        res.status(400).json(HttpResult.Fail("Product type is required!"));
        return;
    } else if (type && (typeof type !== 'string' || type.length < 3)) {
        // If 'type' is provided but has fewer than 3 characters, reject it
        res.status(400).json(HttpResult.Fail("Product type must be at least 3 characters long!"));
        return;
    }

    // Price must be present for creation or must be a positive number
    if (!id && !price) {
        res.status(400).json(HttpResult.Fail("Product price is required!"));
        return;
    } else if (price && (typeof price !== 'number' || price < 0)) {
        // If 'price' is provided but is not a non-negative number, reject it
        res.status(400).json(HttpResult.Fail("Product price must be greater than zero!"));
        return;
    }

    const currentDate = new Date(); // Capture the current date for date validation

    // dateRegister must be present for creation or must be a valid date string not in the future
    if (!id && !dateRegister) {
        res.status(400).json(HttpResult.Fail("Product date register is required!"));
        return;
    } else if (
        dateRegister &&
        (
            typeof dateRegister !== 'string' ||                       // Ensure dateRegister is a string
            !Date.parse(dateRegister) ||                               // Ensure the string can be parsed into a valid date
            new Date(dateRegister) > currentDate                       // Ensure the date is not in the future
        )
    ) {
        // If any date validation fails, return an error
        res.status(400).json(HttpResult.Fail("Product date register must be a valid date!"));
        return;
    }

    next(); // If all validations pass, proceed to next middleware or route handler
}
