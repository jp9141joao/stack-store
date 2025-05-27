import Employee from '../models/Employee';
import { Request, Response } from 'express';
import { EmployeeDTO } from '../types/types';
import { HttpResult } from '../utils/httpResult';

export const getEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        Employee.
    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while fetching employees!"));
    }
}

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
        Employee.create({
            name,
            position,
            salary,
            hired
        });

        res.status(201).json(HttpResult.Success("Employee created successfully!"));
    } catch (error: any) {
        console.error(error);
        res.status(500).json(HttpResult.Fail("An unexpected error occurred while creating employee!"));
    }
}
