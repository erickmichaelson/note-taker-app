const express = require('express');

//this creates and 'express' server for node. 
const app = express();

//initial port
const PORT = process.envPORT || 8080;



app.get('/', function(req, res){
    
})
//using express for data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// Router methods
// navigates servers responses to requests
require('.routes/apiRoutes')(app);
require('.routes/htmlRoutes')(app);

//listener function to begin server listening for requests
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});