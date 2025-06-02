import swaggerJsdoc from 'swagger-jsdoc';

// Swagger definition object with general API info
const swaggerDefinition = {
    openapi: '3.0.0', // Specifies OpenAPI version
    info: {
        title: 'Stack Store API', // API name
        version: '1.0.0', // API version
        description: 'API documentation with swagger' // Description shown in Swagger UI
    },
    servers: [
        {
            url: 'https://stack-store.onrender.com', // Base URL of your API (development server)
            description: 'Development Server'
        },
    ],
    components: {
        schemas: {
            // Schema that defines a "Product" object used in API responses
            Product: {
                type: 'object',
                properties: {
                    id: { type: 'string', example: '605c3c2f1c4ae4567890abcd' },
                    name: { type: 'string', example: 'Notebook' },
                    description: { type: 'string', example: 'High-end gaming laptop'},
                    color: { type: 'string', example: 'Black' },
                    weight: { type: 'number', example: 2.6 },
                    type: { type: 'string', example: 'Eletronics' },
                    price: { type: 'number', example: 1500.0 },
                    dateRegister: { type: 'string', format: 'date-time', example: '2025-05-28T12:00:00Z'},
                },
                required: ['name', 'description', 'color', 'weight', 'type', 'price', 'dateRegister'],
            },
            // Standard API response when returning a single Product
            HttpResultProduct: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Product' }, // Reuses Product schema
                    error: { type: 'string', example: '' },
                },
            },
            // Standard API response when returning an array of Products
            HttpResultProductArray: {
                type: 'object',
                properties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Product'} },
                    error: { type: 'string', example: '' }
                }, 
            },
            // Standard API response when an error occurs
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

// Options for swagger-jsdoc
const options = {
    definition: swaggerDefinition, // The Swagger definitions declared above
    apis: ['./src/routes/*.ts'], // Path to files where API routes are documented using Swagger comments
}

// Generate the Swagger specification from the options
export const swaggerSpec = swaggerJsdoc(options);
