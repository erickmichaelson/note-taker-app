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

// Read db.json
function readJSONfile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch(exception) {
      callback(exception);
    }
  });
}





//basic route that sends the user first to the AJAX Page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, '../public/assets/js/index.js')));

//route to access db.json objects
app.get("/api/notes", (req, res) => readJSONfile('./db/db.json', function (err, json) {
    if(err) { throw err; }
  
    res.send(json);
  }));


//creates new note
app.post('/api/notes', (req, res) => {
    let obj = {
        table: []
      };

    const newNote = req.body; 
    newNote.id = uniqid.process();

    fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          // turn obj into an object
          obj = JSON.parse(data);
          obj.push(newNote);
          // convert back to json after new note is added
          json = JSON.stringify(obj);
          fs.writeFile('./db/db.json', json, 'utf8', (err) => {
            if (err) throw err;
            console.log('Successfully saved new note.')
            res.sendStatus(200);
          });
        }
      });
});
   



//begins the server listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));