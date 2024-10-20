import { initializeDatabase, db } from './src/repository/db.js';
import express from 'express';
import { ObjectId } from 'mongodb'; // Importando ObjectId
import bodyParser from 'body-parser'; // Middleware para parsing do corpo da requisição

const app = express();
const port = 3000;

app.use(bodyParser.json());

initializeDatabase().then(() => {
  console.log('Database initialized');
}).catch(err => {
  console.error('Database initialization failed:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/personagens', async (req, res) => {
    try {
        const persons = await db.collection('Characters').find().toArray(); // Usando a variável db
        res.json(persons);
    } catch (error) {
        res.status(500).send('Erro ao buscar personagens');
    }
});

app.post('/personagens', async (req, res) => {
    const novoPersonagem = req.body;

    try {
        const result = await db.collection('Characters').insertOne(novoPersonagem); // Usando a variável db
        res.status(201).json({ id: result.insertedId, ...novoPersonagem });
    } catch (error) {
        res.status(500).send('Erro ao criar personagem');
    }
});

app.get('/personagens/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const personagem = await db.collection('Characters').findOne({ _id: ObjectId(id) }); // Usando a variável db
        if (!personagem) {
            return res.status(404).send('Personagem não encontrado');
        }
        res.json(personagem);
    } catch (error) {
        res.status(500).send('Erro ao buscar personagem');
    }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
