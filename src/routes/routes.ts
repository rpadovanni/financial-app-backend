import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AccountsController from '../controllers/AccountsController';

const routes = Router();

// Accounts
routes.get('/accounts', AccountsController.index);
routes.get('/accounts/:id', AccountsController.show);
routes.post('/accounts', AccountsController.create);
routes.put('/accounts/:id', AccountsController.update);
routes.delete('/accounts/:id', AccountsController.delete);

// Users
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

export default routes;