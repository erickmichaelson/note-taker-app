const app = require("express").Router()
const fs = require('fs');
const notesDb = require("../db/db.json");
const uniqid = require("uniqid");
let noteDB = [];

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

  //route to access db.json objects
app.get("/api/notes", (req, res) => readJSONfile('./db/db.json', function (err, json) {
    if(err) { throw err; }
    noteDB = json;
    res.send(json);

  }));


//creates new note
app.post('/api/notes', (req, res) => {
    let obj = {
        table: []
      };

    const newNote = req.body; 
    newNote.id = uniqid.process();
    console.log("POST route")

    fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          console.log(err);
        } else {
          // turn obj into an object
          obj = JSON.parse(data);
          obj.push(newNote);
          // convert back to json after new note is added
          json = JSON.stringify(obj);
          noteDB = json
          fs.writeFile('./db/db.json', json, 'utf8', (err) => {
            if (err) throw err;
            console.log('Successfully saved new note.')
            res.sendStatus(200);
          });
        }
      });
});
   app.delete(`/api/notes/:id`,(req,res) => {
       var id = req.params.id
       var notesList = []
       notesList = noteDB.filter( ele => ele.id !== id)
       console.log(notesList,"delete route")
       json = notesList
       fs.writeFile('./db/db.json', JSON.stringify(notesList), 'utf8', (err) => {
        if (err) throw err;
        console.log('Successfully saved new note.')
        res.sendStatus(200);
      });
   })
module.exports = app;
