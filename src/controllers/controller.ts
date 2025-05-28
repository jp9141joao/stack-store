import Employee from '../models/Employee';
import { Request, Response } from 'express';
import { EmployeeDTO } from '../types/types';
import { HttpResult } from '../utils/httpResult';
import Product from '../models/Product';

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(422).json(HttpResult.Success("Employee ID is required!"));
        return;
    }

    try {
        const employee = await Employee.findById(id);

        if (!employee) {
            res.status(404).json(HttpResult.Fail("Employee not found!"));
            return;
        }

        res.status(202).json(HttpResult.Success(employee));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching employee!"));
        return;
    }
}

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees = await Employee.find();

        res.status(202).json(HttpResult.Success(employees));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching employees!"));
        return;
    }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {

    const { name, position, salary, hired } = req.body as EmployeeDTO;

    if (!name) {
        res.status(422).json(HttpResult.Success("Employee name is required!"));
        return;
    } else if (typeof name === 'string' && name.length < 3) {
        res.status(422).json(HttpResult.Success("Employee name must be at least 3 characters long!"));
        return;
    }

    if (!position) {
        res.status(422).json(HttpResult.Success("Employee position is required!")); 
        return;
    } else if (typeof position === 'string' && position.length < 3) {
        res.status(422).json(HttpResult.Success("Employee position must be at least 3 characters long!"));
        return;
    }

    if (!salary) {
        res.status(422).json(HttpResult.Success("Employee salary is required!"));
        return;
    } else if (typeof salary !== 'number' || salary <= 0) {
        res.status(422).json(HttpResult.Success("Employee salary must be a positive number!"));
        return;
    }

    if (!hired) {
        res.status(422).json(HttpResult.Success("Employee hired status is required!"));
        return;
    } else if (typeof hired !== 'boolean') {
        res.status(422).json(HttpResult.Success("Employee hired status must be a boolean value!"));
        return;
    }

    try {
        await Employee.create({
            name,
            position,
            salary,
            hired
        });

        res.status(201).json(HttpResult.Success("Employee created successfully!"));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while creating employee!"));
        return;
    }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, position, salary, hired } = req.body as Partial<EmployeeDTO>;

    if (!id) {
        res.status(422).json(HttpResult.Success("Employee ID is required!"));
        return;
    }

    let newData = {}

    if (name) {

        if (typeof name !== 'string' || name.length < 3) {
            res.status(422).json(HttpResult.Success("Employee name must be at least 3 characters long!"));
            return;
        }

        newData = { ...newData, name };
    }

    if (position) {

        if (typeof position !== 'string' || position.length < 3) {
            res.status(422).json(HttpResult.Success("Employee position must be at least 3 characters long!"));
            return;
        }

        newData = { ...newData, position };
    }

    if (salary) {

        if (typeof salary !== 'number' || salary <= 0) {
            res.status(422).json(HttpResult.Success("Employee salary must be a positive number!"));
            return;
        }

        newData = { ...newData, salary };
    }

    if (hired !== undefined) {

        if (typeof hired !== 'boolean') {
            res.status(422).json(HttpResult.Success("Employee hired status must be a boolean value!"));
            return;
        }

        newData = { ...newData, hired };
    }


    try {

        const employee = await Employee.findByIdAndUpdate(
            id,
            { $set: newData },
            { new: true, runValidators: true }
        )

        if (!employee) {
            res.status(404).json(HttpResult.Fail("Employee not found!"));
            return;
        }

        res.status(202).json(HttpResult.Success("Employee updated successfully!"));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while updating employee!"));
        return;
    }
}

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(422).json(HttpResult.Success("Employee ID is required!"));
        return;
    }

    try {
        
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            res.status(404).json(HttpResult.Fail("Employee not found!"));
            return;
        }

        res.status(202).json(HttpResult.Success("Employee deleted successfully!"));

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while deleting employee!"));
        return;
    }
}


export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (!id) {
        res.status(422).json(HttpResult.Success("Product ID is required!"));
        return;
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json(HttpResult.Fail("Product not found!"));
            return;
        }

        res.status(202).json(HttpResult.Success(product));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching product!"));
        return;
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();

        res.status(202).json(HttpResult.Success(products));
        return;

    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching products!"));
        return;
    }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { id, name, description, color, weight, type, price, dateRegister } = req.body;
} 