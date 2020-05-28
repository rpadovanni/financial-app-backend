import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = Router();

routes.get('/users', UserController.index);
// routes.post('/users/:id', UserController.create);
// routes.post('/users', UserController.create);
// routes.put('/users:id', UserController.create);
// routes.delete('/users/:id', UserController.create);

export default routes;