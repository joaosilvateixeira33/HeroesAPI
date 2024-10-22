import { initializeDatabase, db } from './src/repository/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import Ajv from 'ajv';
import { personagemSchema } from './src/schemas/personagemSchema.js';

const app = express();
const port = 3000;

const ajv = new Ajv();
const validate = ajv.compile(personagemSchema);

app.use(bodyParser.json());

initializeDatabase().then(async () => {
  console.log('Database initialized');
  
  // Indexando o campo 'nickname' para otimizar buscas
  await db.collection('Characters').createIndex({ nickname: 1 });
}).catch(err => {
  console.error('Database initialization failed:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/personagens', async (req, res) => {
  try {
    const persons = await db.collection('Characters').find().project({ _id: 0 }).toArray(); // Projeção para excluir _id
    res.json(persons);
  } catch (error) {
    res.status(500).send('Erro ao buscar personagens');
  }
});

app.post('/personagens', async (req, res) => {
  const novoPersonagem = req.body;

  const valid = validate(novoPersonagem);
  if (!valid) {
    return res.status(400).json({ errors: validate.errors });
  }

  try {
    const result = await db.collection('Characters').insertOne(novoPersonagem);
    res.status(201).json({ id: result.insertedId, ...novoPersonagem });
  } catch (error) {
    res.status(500).send('Erro ao criar personagem');
  }
});

app.get('/personagens/:nickname', async (req, res) => {
  const { nickname } = req.params;

  try {
    const personagem = await db.collection('Characters').findOne(
      { nickname },
      { projection: { _id: 0 } } // Projeção para excluir _id
    );
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