const app = require("express").Router()
const path = require('path');

//basic route that sends the user first to the AJAX Page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
// app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, '../public/assets/js/index.js')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));


module.exports = app;