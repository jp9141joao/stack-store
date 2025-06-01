import dotenv from 'dotenv';
import express, { response } from 'express';
import mongoose from 'mongoose';
import { routes } from '../routes/routes';
import { swaggerSpec } from './swagger';
import swaggerUi from 'swagger-ui-express';

// Load environment variables from .env file
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const DATABASE_USER = process.env.DATABASE_USER || '';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';

// Replace <db_username> and <db_password> in the URL with actual values from the environment
const DATABASE_URL = process.env.DATABASE_URL?.replace('<db_username>', DATABASE_USER).replace('<db_password>', DATABASE_PASSWORD) || '';

// If the final database URL is not defined, throw an error
if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the .env file.");
}

// Function to connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(DATABASE_URL); // Attempt to connect using mongoose
        console.log('Connected to MongoDB successfully!');
    } catch (error: any) {
        console.error(error); // Log connection errors
    }
}

// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(
    express.urlencoded({
        extended: true // Allows nested objects in request bodies
    })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Register application routes
app.use(routes);

// Serve Swagger UI documentation at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to the database
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
