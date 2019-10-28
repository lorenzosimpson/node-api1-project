// implement your API here
const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

// ============ GET REQUESTS ===================

// GET all users
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
        user ? res.status(200).json(user) : res.status(404).json({  message: "The user with the specified ID does not exist." })
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})


// ============== POST REQUESTS ==============

server.post('/api/users', (req, res) => {
    const userObj = req.body;

    !userObj.name || !userObj.bio ?  res.status(400).json({ error: "Please provide name and bio for the user."}) : db.insert(userObj)
    
    .then(user => {
        console.log(userObj)
        res.status(201).json(user.id);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
})

// ============== PUT REQUESTS ===========
// PUT a user by id

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;

   if ( !name || !bio) res.status(400).json({ errorMessage: "Please provide name and bio for the user." })

    db.update(id, { name, bio })
    .then(updated => {
        if (updated) {
           db.findById(id)
           .then(user => res.status(200).json(user))
           .catch(err => {
               console.log(err);
           })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The user could not be modified "}))
})

// ========== DELETE REQUESTS =================
// Delete a user by id
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if (user) {
            db.remove(id)
                .then(removed => {
            if (removed ) res.status(200).json({ message: "User removed" })
            })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The user could not be removed" }))
})

const port = 8000;
server.listen(port, () => console.log(`\n=== Server listening on port ${port} ===\n`))