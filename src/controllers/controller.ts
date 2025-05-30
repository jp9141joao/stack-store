import { Request, Response } from 'express';
import { ProductDTO } from '../types/types';
import { HttpResult } from '../utils/httpResult';
import Product from '../models/Product';
import mongoose from 'mongoose';

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

export const getProductByIdOrName = async (req: Request, res: Response): Promise<void> => {
    const { param } = req.body;

    let product: any;
    let filter: any = {};

    try {

        if (mongoose.Types.ObjectId.isValid(param)) {
            filter._id = param;
        } else {
            filter._name = param;
        }

        product = await Product.find(filter)

        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        res.status(200).json(HttpResult.Success(product));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching product!"));
        return;
    }
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, color, weight, type, price, dateRegister } = req.body as ProductDTO;

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

        res.status(201).json(HttpResult.Success("Product created successfully!"));
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

    const allowedFields: (keyof ProductDTO)[] = [
        'name',
        'description',
        'color',
        'weight',
        'type',
        'price',
        'dateRegister'
    ];

    let newData: Partial<ProductDTO> = {};

    for (const key of allowedFields) {
        const value = (req.body as any)[key];
        
        if (value !== undefined && value !== null) {
            newData[key] = value;
        }
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


