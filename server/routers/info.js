const express = require('express');
const app = express();

app.get('/info', function(req, res) {
    res.send("get")
})

app.post('/info', function(req, res) {
    res.send("post")
})

app.put('/info/:id', function(req, res) {
    res.send("put")
})

app.delete('/info/:id', function(req, res) {
    res.send("delete")
})

module.exports = app