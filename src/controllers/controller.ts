import { Request, Response } from 'express';
import { ProductDTO } from '../types/types';
import { HttpResult } from '../utils/httpResult';
import Product from '../models/Product';
import { stringify } from 'querystring';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();

        res.status(200).json(HttpResult.Success(products));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching products!"));
        return;
    }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json(HttpResult.Success("Product ID is required!"));
        return;
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        res.status(200).json(HttpResult.Success(product));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching product by ID!"));
        return;
    }
};

export const getProductByName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    if (!name) {
        res.status(400).json(HttpResult.Fail("Product name is required"));
        return;
    } else if (typeof name !== 'string' || stringify.length < 5) {
        res.status(400).json(HttpResult.Fail("Product name must be at least 5 caracters long!"));
        return;
    }

    try {

        const product = await Product.find({ name: name});

        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        res.status(200).json(HttpResult.Success(product));
        return;

    } catch (error: any) {
        console.log(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching product by name!"))
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, color, weight, type, price, dateRegister } = req.body as ProductDTO;

    if (!name) {
        res.status(400).json("Product name is required!");
        return;
    } else if (typeof name !== 'string' || name.length < 5) {
        res.status(400).json(HttpResult.Fail("Product name must be at least 5 characters long!"));
        return;
    }   

    if (!description) {
        res.status(400).json(res.status(400).json(HttpResult.Fail("Product description is required!")));
        return;
    } else if (typeof description !== 'string' || description.length < 10) {
        res.status(400).json(HttpResult.Fail("Product description must be at least 10 caracters long!"));
        return;
    }

    if (!color) {
        res.status(400).json(HttpResult.Fail("Product color is required!"));
        return;
    } else if (typeof color !== 'string' || color.length < 3) {
        res.status(400).json(HttpResult.Fail("Product color must be at least 3 caracters long!"));
        return;
    }

    if (!weight) {
        res.status(400).json(HttpResult.Fail("Product weight is required!"));
        return;
    } else if (typeof weight !== 'number' || weight < 0) {
        res.status(400).json(HttpResult.Fail("Product weight must be greater than zero!"));
        return;
    }

    if (!type) {
        res.status(400).json(HttpResult.Fail("Product type is required!"));
        return;
    } else if (typeof type !== 'string' || type.length < 3) {
        res.status(400).json(HttpResult.Fail("Product type must be at least 3 caracters long!"));
        return;
    }

    if (!price) {
        res.status(400).json(HttpResult.Fail("Product price is required!"));
        return;
    } else if (typeof price !== 'number' || price < 0) {
        res.status(400).json(HttpResult.Fail("Product price must be greater than zero!"));
        return;
    }

    const currentDate = new Date();

    if (!dateRegister) {
        res.status(400).json(HttpResult.Fail("Product date register is required!"));
        return;
    } else if (typeof dateRegister !== 'string' || !Date.parse(dateRegister) || new Date(dateRegister) > currentDate) {
        res.status(400).json(HttpResult.Fail("Product date register must be a valid date!"));
        return;
    }

    try {
        await Product.create({
            name,
            description,
            color,
            weight,
            type,
            price,
            dateRegister
        });

        res.status(200).json(HttpResult.Success("Product created successfully!"));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while creating product!"));
        return;
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, description, color, weight, type, price, dateRegister } = req.body as Partial<ProductDTO>;

    if (!id) {
        res.status(400).json(HttpResult.Success("Product ID is required!"));
        return;
    }

    let newData: Partial<ProductDTO> = {};

    if (name) {

        if (typeof name !== 'string' || name.length < 5) {
            res.status(400).json(HttpResult.Fail("Product name must be at least 5 characters long!"));
            return;
        }

        newData = { ...newData, name };
    }

    if (description) {

        if (typeof description !== 'string' || description.length < 10) {
            res.status(400).json(HttpResult.Fail("Product description must be at least 10 caracters long!"));
            return;
        }

        newData = { ...newData, description };
    }

    if (color) {

        if (typeof color !== 'string' || color.length < 3) {
            res.status(400).json(HttpResult.Fail("Product color must be at least 3 caracters long!"));
            return;
        }

        newData = { ...newData, color };
    }

    if (weight) {

        if (typeof weight !== 'number' || weight < 0) {
            res.status(400).json(HttpResult.Fail("Product weight must be greater than zero!"));
            return;
        }

        newData = { ...newData, weight };
    }

    if (type) {

        if (typeof type !== 'string' || type.length < 3) {
            res.status(400).json(HttpResult.Fail("Product type must be at least 3 caracters long!"));
            return;
        }

        newData = { ...newData, type };
    }

    if (price) {

        if (typeof price !== 'number' || price < 0) {
            res.status(400).json(HttpResult.Fail("Product price must be greater than zero!"));
            return;
        }

        newData = { ...newData, price };
    }

    if (dateRegister) {

        const currentDate = new Date();

        if (typeof dateRegister !== 'string' || !Date.parse(dateRegister) || new Date(dateRegister) > currentDate) {
            res.status(400).json(HttpResult.Fail("Product date register must be a valid date!"));
            return;
        }

        newData = { ...newData, dateRegister };
    }

    try {

        const product = await Product.findByIdAndUpdate(
            id,
            { $set: newData },
            { new: true, runValidators: true }
        );

        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        res.status(200).json(HttpResult.Success("Product updated successfully!"));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while updating product!"));
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json(HttpResult.Fail("Product ID is required!"));
        return; 
    }

    try {

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        res.status(200).json(HttpResult.Success("Product deleted successfully!"));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while deleting product"));
        return;
    }
}


