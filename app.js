const path = require('path'); 
const express = require('express'); 

const app = express(); // create an express application

const {createPool} = require('./database/database');
const defaultRouter = require('./routes/defaultRoutes');
const postRouter = require('./routes/postRoutes');
const { pool } = require('./database/db');

app.set('view engine', 'ejs'); //setting templating engine
app.set('views', path.join(__dirname, 'views')); //addressing my templates


//using middlewares for incoming requests
app.use(express.urlencoded({extended:false}) ); // decoding urlencode HTTP request
app.use('/static',express.static('public')); //serving static files from public folder and with virtual path prefix named static

// adding route handlers
app.use('/', defaultRouter);
app.use('/posts', postRouter); 


// server-side error-handlre middleware
app.use((error,req,res,next) => {
    if (error) {
        console.log(error);
        res.render("500")
    }
})





//client-side error-handlre middleware
app.use((req, res) => {
    res.render('404'); // page not found error handlre
})



async function startServer(){
    try {
        const connection = await pool.getConnection();
        app.listen(3000,()=>{
            connection?.release()
        }); // server is running on port 3000 on dev mode

    } catch (error) {
        console.log(error);
        console.log('server is down');
        process.exit(1);        
    }
}

startServer();



