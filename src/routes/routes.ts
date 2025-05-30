import { Router } from 'express'
import { createProduct, deleteProduct, getProductByIdOrName, getProducts, updateProduct } from '../controllers/controller';
import { CheckParameters, CheckProductData, CheckProductId } from '../middlewares/productMiddleware';

const routes = Router();

/**
 *  @swagger
 * /product:
 *      get:
 *          summary: Get all products
 *          tags:
 *              - Products
 *          responses:
 *              200:
 *                  description: List of products
 *                  content:
 *                      application/json:
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
 *          summary: Get a product by ID or name
 *          tags:
 *              - Products
 *          parameters:
 *              - in: path
 *                name: param
 *                schema:
 *                  type: string
 *                required: true
 *                description: Product ID or Product name
 *          responses:
 *              200:
 *                  description: Product found by ID or name
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultProduct'
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              404:
 *                  description: Not Found - Resource not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 **/
routes.get('/product/:param', CheckParameters, getProductByIdOrName);

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
 *                  description: Product created successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultProduct'
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 **/
routes.post('/product', CheckProductData, createProduct);

/**
 * @swagger
 * /product/{id}:
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
 *                description: Product ID
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
 *                              $ref: '#/components/schemas/HttpResultProduct'
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              404:
 *                  description: Not Found - Resource not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 **/
routes.put('/product/:id', CheckProductId, CheckProductData, updateProduct);

/**
 * @swagger
 * /product/{id}:
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
 *                description: Product ID
 *          responses:
 *              200:
 *                  description: Product deleted successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultProduct'
 *              400:
 *                  description: Bad Request - Invalid params or missing data
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              404:
 *                  description: Not Found - Resource not found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 *              500:
 *                  description: Internal server error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/HttpResultError'
 **/
routes.delete('/product/:id', CheckProductId, deleteProduct);

export { routes };

