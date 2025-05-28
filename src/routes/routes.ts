import { Router } from 'express'

const routes = Router();

routes.get('/employees');
routes.get('/employee');
routes.post('/employee');
routes.put('/employee/:id');
routes.delete('/employee/:id');

routes.get('/product');
routes.get('/product/:id');
routes.post('/product');
routes.put('/product/:id');
routes.delete('/product/:id');

export { routes };