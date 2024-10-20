const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

async function conectarAoBanco() {
    try {
        await client.connect();
        console.log('Conexão com o MongoDB realizada com sucesso!');
        db = client.db('DCPersons');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(port, async () => {
    await conectarAoBanco();
    console.log(`Servidor rodando em http://localhost:${port}`);
});