"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("../routes/routes");
const swagger_1 = require("./swagger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
        await mongoose_1.default.connect(DATABASE_URL);
        console.log('Connected to MongoDB successfully!');
    }
    catch (error) {
        console.error(error);
    }
}
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin ${origin}.`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
