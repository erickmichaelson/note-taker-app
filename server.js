//these are dependencies
const express = require('express');


//this sets up express server
const app = express();
const PORT = process.env.PORT || 3000;

//data parsing for express server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"))




//begins the server listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));