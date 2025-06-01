import dotenv from 'dotenv';
import express, { response } from 'express'
import mongoose from 'mongoose';
import { routes } from '../routes/routes';
import { swaggerSpec } from './swagger';
import swaggerUi from 'swagger-ui-express';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_USER = process.env.DATABASE_USER || '';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
const DATABASE_URL = process.env.DATABASE_URL?.replace('<db_username>', DATABASE_USER).replace('<db_password>', DATABASE_PASSWORD) || '';

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in the .env file.");
}

async function connectDB() {

    try {
        await mongoose.connect(DATABASE_URL)
        console.log('Connected to MongoDB successfully!');
    } catch (error: any) {
        console.error(error);
    }
}

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
app.use(routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

