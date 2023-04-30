import express from 'express';

import ItemsController from './controllers/ItemsController'

//index , show, create, update, delete

const routes = express.Router();

const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

export default routes;

// Service Pattern
// Repository Pattern (Data Mapper)