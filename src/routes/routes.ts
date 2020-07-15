import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AccountsController from '../controllers/AccountsController';
import DebtsController from '../controllers/DebtsController';
import CardsController from '../controllers/CardsController';
import CardBillsController from '../controllers/CardBillsController';

const routes = Router();

// Accounts
routes.get('/accounts', AccountsController.index);
routes.get('/accounts/:id', AccountsController.show);
routes.post('/accounts', AccountsController.create);
routes.put('/accounts/:id', AccountsController.update);
routes.delete('/accounts/:id', AccountsController.delete);

// Cards
routes.get('/cards', CardsController.index);
routes.get('/cards/:id', CardsController.show);
routes.post('/cards', CardsController.create);
routes.put('/cards/:id', CardsController.update);
routes.delete('/cards/:id', CardsController.delete);

// Card Bills
routes.get('/cards/:cardId/card-bills', CardBillsController.index);
routes.get('/cards/:cardId/card-bills/:cardBillId', CardBillsController.show);
routes.post('/cards/:cardId/card-bills', CardBillsController.create);
routes.put('/cards/:cardId/card-bills/:cardBillId', CardBillsController.update);
routes.delete('/cards/:cardId/card-bills/:cardBillId', CardBillsController.delete);

// Debts
routes.get('/debts', DebtsController.index);
routes.get('/debts/:id', DebtsController.show);
routes.post('/debts', DebtsController.create);
routes.put('/debts/:id', DebtsController.update);
routes.delete('/debts/:id', DebtsController.delete);

// Users
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

export default routes;