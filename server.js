//these are dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require("uniqid");
const notesDb = require("./db/db.json");

//this sets up express server
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing for express server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));




//begins the server listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
