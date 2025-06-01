import dotenv from 'dotenv';
import express, { response } from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import { routes } from '../routes/routes';
import { swaggerSpec } from './swagger';
import swaggerUi from 'swagger-ui-express';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:5173';
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
    cors({
        origin: function (origin, callback) {

            if (!origin) return callback(null, true);

            if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
                const msg = `The CORS policy for this site does not allow access from the specified Origin ${origin}.`;

                return callback(new Error(msg), false);
            }

            return callback(null, true);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
app.use(routes);
app.use('./api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

