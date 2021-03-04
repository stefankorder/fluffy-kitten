import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

import Cat from './models/cat.model.js'

const connectionString = 'mongodb+srv://fin2u:28148937@fin2u.6sv6u.mongodb.net/fluffykitten?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const server = express();

server.use(bodyParser.json());

server.get('/', (request, response) => {
    response.json({ status: 'Server is up and running'});
});

server.get('/cats', (request, response) => {
    Cat.find().then(cats => response.json(cats)).then((error) => response.json(error))
})

server.get('/cats/:catId', (request, response) => {
    const catId = request.params.catId;

    Cat.findById(catId).then(cat => response.json(cat))
})

server.post('/cats', (request, response) => {
    const kitty = new Cat({
        name: request.body.name,
        fur: request.body.fur,
        lives: request.body.lives
    })

    kitty.save().then(kitty => response.json(`${kitty.name} says meow`)).catch((error) => response.json(error))
})

server.put('/cats/:catId', (request, response) => {
    const catId = request.params.catId;
    const updatedCat = request.body;
    
    Cat.findOneAndUpdate({ _id: catId }, updatedCat, { new: true }).then(result => response.json(result)).catch(() => response.json(`Keine Katze unter ${catId} gefunden`))
})

server.delete('/cats/:catId', (request, response) => {
    const catId = request.params.catId;
    
    Cat.findOneAndDelete({ _id: catId }).then((result) => response.json(`Die Katze ${result.name} ist abgehauen!`)).catch(() => response.json(`Keine Katze unter ${catId} gefunden`))
})

server.listen(4000, () => console.log('Server has started!'))