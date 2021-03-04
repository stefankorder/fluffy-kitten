import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser'

const connectionString = 'mongodb://localhost:27017/';

const databaseName = 'fluffy-kitten';

const mongoClient = mongodb.MongoClient;

const server = express();

server.use(bodyParser.json());

server.get('/', (request, response) => {
    response.json({ status: 'Server is running!'})
})

server.get('/cats', (request, response) => {
    mongoClient.connect(connectionString, async (error, client) => {
        const db = client.db(databaseName);
        const kittyCats = await db.collection('kittyCats').find().toArray();
        response.json(kittyCats);
    });
})

server.post('/cats', (request, response) => {
    const cat = { name: request.body.name, fur: request.body.fur, lives: request.body.lives}

    mongoClient.connect(connectionString, (error, client) => {
    const db = client.db(databaseName)
    const result = db.collection('kittyCats')
    .insertOne(cat)
    .then(result => response.json(result.ops[0]))
    })
})

server.listen(4000);