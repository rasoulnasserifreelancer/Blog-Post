const path = require('path'); 
const express = require('express'); 

const app = express(); // create an express application


app.set('view engine', 'ejs'); //setting templating engine
app.set('views', path.join(__dirname, 'views')); //addressing my templates



//using middlewares for incoming requests
app.use(express.urlencode({extended:false}) ); // decoding urlencode HTTP request
app.use(express.static('public')); //serving static files from public folder


// different routes here 


app.listen(3000); // server is running on port 3000 on dev mode