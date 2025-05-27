import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    salary: Number,
    hired: Boolean
});

const Employee = mongoose.model( 'Employee', employeeSchema );

export default Employee;