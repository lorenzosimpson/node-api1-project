// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// GET users
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

// GET user by id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        user ? res.status(200).json(user) : res.status(404).json({ error: 'The user does not exist'})
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.post('/api/users', (req, res) => {
    const userObj = req.body;

    !userObj.name || !userObj.bio ?  res.status(400).json({ error: 'Please include name and bio'}) : db.insert(userObj)
    
    .then(user => {
        console.log(userObj)
        res.status(201).json(user.id);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})




const port = 8000;
server.listen(port, () => console.log(`\n=== Server listening on port ${port} ===\n`))