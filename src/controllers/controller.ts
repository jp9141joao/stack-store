import { Request, Response } from 'express';                                                   
import { ProductDTO } from '../types/types';                                                    
import { HttpResult } from '../utils/httpResult';                                                // Import a utility to standardize HTTP responses (Success/Fail format)
import Product from '../models/Product';                                                         // Import the Mongoose model for the "Product" collection
import mongoose from 'mongoose';                                                                 // Import mongoose to validate ObjectId and interact with MongoDB

// GET all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        // Attempt to fetch all product documents from MongoDB
        const products = await Product.find();

        // If no products are found, return a message instead of an empty array
        // HttpResult.Success wraps the payload into a standardized success response object
        res.status(200).json(
            HttpResult.Success(
                products.length > 0 
                    ? products                                    // Return the array of products if any exist
                    : 'No products exist yet!'                    // Otherwise, return a user-friendly message
            )
        );
        return; // Explicitly end execution of this function

    } catch (error: any) {
        // In case of any unexpected error during the database query, log it for debugging
        console.error(error);
        // Return a 500 Internal Server Error with a standardized failure response
        res.status(500).json(
            HttpResult.Fail("An unexpected error occurred while fetching products!")
        );
        return;
    }
};

// GET product by ID or name (based on dynamic route param)
export const getProductByIdOrName = async (req: Request, res: Response): Promise<void> => {
    const { param } = req.params; // Extract the dynamic route parameter, which could be an ID or a name
    let product: any; // Declare a variable to hold the query result

    try {
        // Determine if the provided param is a valid MongoDB ObjectId
        if (mongoose.Types.ObjectId.isValid(param)) {
            // If valid, perform a find by _id (returns an array of matching documents)
            product = await Product.find({ _id: param });
        } else {
            // Otherwise, treat the param as a product name and search by name field
            product = await Product.find({ name: param });
        }

        // If the query returned null or undefined (no result), respond with 404 Not Found
        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        // If the query returned an empty array, send a message indicating no match
        // Otherwise, return the found product(s) in a standardized success response
        res.status(200).json(
            HttpResult.Success(
                product.length > 0 
                    ? product                                    // Return array with the matching product(s)
                    : 'No product was found with this parameter!'// Or return a user-friendly message if array is empty
            )
        );
        return;

    } catch (error: any) {
        // Log any unexpected error and respond with 500 Internal Server Error
        console.error(error);
        res.status(500).json(
            HttpResult.Fail("An unexpected error occurred while fetching product!")
        );
        return;
    }
}

// POST create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    // Destructure each field of ProductDTO from the request body for type safety
    const { name, description, color, weight, type, price, dateRegister } = req.body as ProductDTO;

    try {
        // Use Mongoose's create() method to add a new document to the "products" collection
        await Product.create({
            name,           // Product name (string)
            description,    // Detailed description (string)
            color,          // Color attribute (string)
            weight,         // Weight attribute (number or string, depending on schema)
            type,           // Type or category of product (string)
            price,          // Price value (number)
            dateRegister    // Date the product was registered (Date or string)
        });

        // Return a 201 Created status with a standardized success message 
        res.status(201).json(HttpResult.Success(`Product created successfully!`));
        return;

    } catch (error: any) {
        // Log any error encountered during creation (e.g. validation failure, DB error)
        console.error(error);
        // Return 500 Internal Server Error with a failure message
        res.status(500).json(
            HttpResult.Fail("An unexpected error occurred while creating product!")
        );
        return;
    }
}

// PUT update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Extract the product ID from the route parameters

    // Define which fields from ProductDTO are allowed to be updated
    const allowedFields: (keyof ProductDTO)[] = [
        'name',
        'description',
        'color',
        'weight',
        'type',
        'price',
        'dateRegister'
    ];

    let newData: Partial<ProductDTO> = {}; // Initialize an object to collect only provided updates

    // Loop through each allowed field to see if it exists in the request body
    for (const key of allowedFields) {
        const value = (req.body as any)[key]; // Read the value for this field from req.body
        // Only include fields that are not undefined or null to avoid overwriting with invalid values
        if (value !== undefined && value !== null) {
            newData[key] = value; // Add the valid field-value pair to newData
        }
    }

    try {
        // Call findByIdAndUpdate to modify the document in MongoDB
        // { $set: newData } applies only the fields in newData
        // { new: true } returns the updated document instead of the old one
        // { runValidators: true } ensures Mongoose schema validation on update
        const product = await Product.findByIdAndUpdate(
            id,
            { $set: newData },
            { new: true, runValidators: true }
        );

        // If no product exists with the given ID, return 404 Not Found
        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        // Otherwise, return 200 OK with a success message
        res.status(200).json(HttpResult.Success("Product updated successfully!"));
        return;

    } catch (error: any) {
        // Log unexpected errors (for example, validation errors or database failures)
        console.error(error);
        // Return 500 Internal Server Error with a failure message
        res.status(500).json(
            HttpResult.Fail("An unexpected error occurred while updating product!")
        );
    }
}

// DELETE a product by ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;                                           // Extract the product ID from the route parameters

    try {
        // Use findByIdAndDelete to remove the document from MongoDB
        const product = await Product.findByIdAndDelete(id);

        // If no product was found with that ID, return 404 Not Found
        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        // Otherwise, return 200 OK with a confirmation message
        res.status(200).json(HttpResult.Success("Product deleted successfully!"));
        return;

    } catch (error: any) {
        // Log any unexpected error during deletion
        console.error(error);
        // Return 500 Internal Server Error with a failure message
        res.status(500).json(
            HttpResult.Fail("An unexpected error occurred while deleting product")
        );
        return;
    }
}
