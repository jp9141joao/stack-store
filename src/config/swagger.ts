import swaggerJsdoc from 'swagger-jsdoc';

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
                    description: { type: 'string', example: 'High-end gaming laptop'},
                    color: { type: 'string', exmaple: 'Black' },
                    weight: { type: 'number', example: 2.6 },
                    type: { type: 'string', example: 'Eletronics' },
                    price: { type: 'number', example: 1500.0 },
                    dateRegister: { type: 'string', format: 'date-time', example: '2025-05-28T12:00:00Z'},
                },
                required: ['name', 'description', 'color', 'weight', 'type', 'price', 'dateRegister'],
            },
            HttpResultProduct: {
                type: 'object',
                proprieties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/Product' },
                    error: { type: 'string', example: { $ref: '#/components/schemas/Product' } },
                },
            
            },
            HttpResultProductArray: {
                type: 'object',
                properieties: {
                    success: { type: 'boolean', example: true },
                    data: { type: 'array', items: { $ref: '#/components/schemas/Product'} },
                    error: { type: 'string', example: '' }
                }, 
            },
            HttpResultError: {
                type: 'object',
                properieties: {
                    success: { type: 'boolean', example: false },
                    data: { type: 'object', nullable: true },
                    error: { type: 'string', example: 'Error menssage' }
                },
            },
        },
    },
};

const options = {
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options);