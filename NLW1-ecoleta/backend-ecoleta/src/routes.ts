import express from 'express';
import knex from './database/connection';

import ItemsController from './controllers/ItemsController'

//index , show, create, update, delete

const routes = express.Router();

const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body

    const ids = await knex('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    const point_items = items.map((item_id: number) => {
        return {
            item_id, 
            point_id: ids[0]
        }
    })

    await knex('point_items').insert(point_items);

    return response.json({
        success: true
    })
})



export default routes;

// Service Pattern
// Repository Pattern (Data Mapper)