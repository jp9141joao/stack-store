import { Router } from 'express'
import { createProduct, deleteProduct, getProductByIdOrName, getProducts, updateProduct } from '../controllers/controller';

const routes = Router();

/**
 *  @swagger
 * /product:
 *      get: 
 *          summary: Get all products ,
 *          tags: 
 *              - Products
 *          responses:
 *              200:
 *                  description: List of products
 *                  content:
 *                      application/json
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultProductArray'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
**/
routes.get('/product', getProducts);

/**
 *  @swagger
 * /product/{param}:
 *      get: 
 *          summary: Get a product by ID or name.
 *          tags:
 *              - Products
 *          parameters: 
 *              - in: path
 *                name: id or name
 *                schema:  
 *                  type: string
 *                required: true
 *                description: 
 *                  Product ID or Product name
 *          responses:
 *              200:
 *                  description: Product found by ID or name
 *                  content:
 *                      application/json:   
    *                      schema:
    *                          $ref: '#/components/schemas/httpRresultProduct'
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/httpResultError'
 *              404:
 *                  description: Not found - Resource not found
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError' 
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'
**/
routes.get('/product/:param', getProductByIdOrName);

/**
 * @swagger
 * /product:
 *      post:
 *          summary: Create a new product
 *          tags:
 *              - Products 
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/json: 
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201: 
 *                  description: Product create successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultProduct'
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'
 *              500: 
 *                  description: Internal serer error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'
**/
routes.post('/product', createProduct);

/**
 * @swagger
 * /product/{id}
 *      put:
 *          summary: Update product data by ID
 *          tags:
 *              - Products
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description
 *                  Product ID
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:    
 *                      schema:
 *                         $ref: '#/components/schemas/Product'
 *          responses:
 *              200:
 *                  description: Product updated successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultProduct'
 *             400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application: 
 *                          schema: 
 *                              $ref: '#/components/schemas/httpResultError'
 *             404: 
 *                  description: Not Found - Resource not found 
 *                  content: 
 *                      application/json: 
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'
 *            500: 
 *                  description: Internal server error
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'
**/
routes.put('/product/:id', updateProduct);

/**
 * @swagger
 * /product/{id}
 *      delete:
 *          summary: Remove a product by ID
 *          tags:
 *              - Products
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
 *                  description: Product deleted successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultProduct'
 *              400: 
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'
 *              404:
 *                  description: Not Found - Resource not found
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/components/schemas/httpResultError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/httpResultError'                     
**/
routes.delete('/product/:id', deleteProduct);

export { routes };
