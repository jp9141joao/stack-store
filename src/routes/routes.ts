import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProductByName, getProducts, updateProduct } from '../controllers/controller';

const routes = Router();

/**
 *  @swagger
 * /product:
 *      get: 
 *          summary: Get all products
 *          tags: 
 *              - products
 *          responses:
 *              200:
 *                  description: List of products
 *                  content:
 *                      application/json
 *                          schema:
 *                              $ref: 
 *              500:
 *                  description: Internal server error
**/
routes.get('/product', getProducts);

/**
 *  @swagger
 * /product/{id}:
 *      get: 
 *          summary: Get a product by ID.
 *          tags:
 *              = Product
 *          parameters: 
 *              - in: path
 *                name: id
 *                schema:  
 *                  type: string
 *                required: true
 *                description: 
 *                  Product ID
 *          responses:
 *              200:
 *                  description: Product found by ID
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *              404:
 *                  description: Internal server error
**/
routes.get('/product/:id', getProductById);
routes.get('/product/:name', getProductByName);
routes.post('/product', createProduct);
routes.put('/product/:id', updateProduct);
routes.delete('/product/:id', deleteProduct);

export { routes };