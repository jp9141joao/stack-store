"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Stack Store API',
        version: '1.0.0',
        description: 'API documentation with swagger'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development Server'
        },
    ],
    components: {
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '605c3c2f1c4ae4567890abcd' },
                    name: { type: 'string', example: 'Notebook' },
                    description: { type: 'string', example: 'High-end gaming laptop' },
                    color: { type: 'string', example: 'Black' },
                    weight: { type: 'number', example: 2.6 },
                    type: { type: 'string', example: 'Eletronics' },
                    price: { type: 'number', example: 1500.0 },
                    dateRegister: { type: 'string', format: 'date-time', example: '2025-05-28T12:00:00Z' },
                },
                required: ['name', 'description', 'color', 'weight', 'type', 'price', 'dateRegister'],
            },
            HttpResultProduct: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Product' },
                    error: { type: 'string', example: '' },
                },
            },
            HttpResultProductArray: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Product' } },
                    error: { type: 'string', example: '' }
                },
            },
            HttpResultError: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: false },
                    data: { type: 'object', nullable: true },
                    error: { type: 'string', example: 'Error message' }
                },
            },
        },
    },
};
const options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
