import { initializeDatabase, db } from './src/repository/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import Ajv from 'ajv';
import { personagemSchema, updatePersonagemSchema} from './src/schemas/personagemSchema.js';

const app = express();
const port = 3000;

const ajv = new Ajv();
const validate = ajv.compile(personagemSchema);
const validateUpdate = ajv.compile(updatePersonagemSchema);

app.use(bodyParser.json());

initializeDatabase().then(async () => {
  console.log('Database initialized');
  await db.collection('Characters').createIndex({ nickname: 1 });
}).catch(err => {
  console.error('Database initialization failed:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/personagens', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const personagens = await db.collection('Characters')
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  res.status(200).json(personagens);
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
      { projection: { _id: 0 } }
    );
    if (!personagem) {
      return res.status(404).send('Personagem não encontrado');
    }
    res.json(personagem);
  } catch (error) {
    res.status(500).send('Erro ao buscar personagem');
  }
});

app.delete('/personagens/:nickname', async (req, res) => {
  const { nickname } = req.params;
  const result = await db.collection('Characters').deleteOne({ nickname });
  if (result.deletedCount === 1) {
    res.status(200).send({ message: 'Personagem removido com sucesso!' });
  } else {
    res.status(404).send({ message: 'Personagem não encontrado!' });
  }
});

app.patch('/personagens/:nickname', async (req, res) => {
  const { nickname } = req.params;
  const updateData = req.body;

  const isValid = validateUpdate(updateData);
  if (!isValid) {
    return res.status(400).json({ errors: validate.errors });
  }

  try {
    const result = await db.collection('Characters').updateOne(
      { nickname },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    res.json({ message: 'Personagem atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar personagem' });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});