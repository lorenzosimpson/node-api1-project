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
        res.status(500).json({ error: 'failed to retrieve users'})
    })
})

server.post('/api/users', (req, res) => {
    const userObj = req.body;
    db.insert(userObj)
    .then(user => {
        console.log(userObj)
        !userObj.name || !userObj.bio ? res.status(400).json({ error: 'Please include name and bio'}) : res.status(201).json(user.id);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'failed to create user'})
    })
})


const port = 8000;
server.listen(port, () => console.log(`\n=== Server listening on port ${port} ===\n`))