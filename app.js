const path = require('path'); 
const express = require('express'); 

const app = express(); // create an express application

const {createPool} = require('./database/database')


app.get('/', (req, res) => {
    res.render('index')
})


app.set('view engine', 'ejs'); //setting templating engine
app.set('views', path.join(__dirname, 'views')); //addressing my templates



//using middlewares for incoming requests
app.use(express.urlencoded({extended:false}) ); // decoding urlencode HTTP request
app.use('/static',express.static('public')); //serving static files from public folder and with virtual path prefix named static


// different routes here 

try {
    const pool = createPool();
    app.listen(3000); // server is running on port 3000 on dev mode
}catch(e) {
    console.log(e);
}
