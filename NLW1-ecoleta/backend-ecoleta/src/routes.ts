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

    const trx = await knex.transaction();

    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    const point_id = insertedIds[0]

    const point_items = items.map((item_id: number) => {
        return {
            item_id, 
            point_id
        }
    })

    await trx('point_items').insert(point_items);

    return response.json({
        success: true
    })
})



export default routes;

// Service Pattern
// Repository Pattern (Data Mapper)