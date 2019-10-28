// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err))
})


const port = 8000;
server.listen(port, () => console.log(`\n=== Server listening on port ${port} ===\n`))