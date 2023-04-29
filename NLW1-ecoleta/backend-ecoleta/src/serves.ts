import express, { request, response } from 'express';

const app = express();

// Rota: Endereço completo de requisição
// Recurso: Qual entidade estamos acessando do sistema

//GET: Buscar uma ou mais informações do back-end
//POST: Criar uma nova informação no back-end
//PUT: Atualizar uma informação existente no back-end
//DELETE: Remover uma informação do back-end

app.get('/users', (request, response) => {
    console.log('Listagem de usuario')

    return response.json([
        'Caio',
        'Nikolas',
        'Amorim',
        'Silva'
    ])
});

app.post('/users', (request, response) => {
    const user = {
        name: 'Caio',
        email: 'caio@nikolas.com'
    }

    return response.json(user)
})

app.listen(3333);