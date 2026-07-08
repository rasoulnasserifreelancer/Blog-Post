const path = require("path");
const express = require("express");
const compression = require("compression");
const crypto = require("crypto");

const debug = require("debug");
const app = express(); // create an express application
debug("express"); // adding express-logger
const log = debug("start:server"); // adding start server logger
const errorLog = debug("error:server"); // adding start server logger
const dotevn = require("dotenv");
dotevn.config();

const { createPool } = require("./database/database");
const defaultRouter = require("./routes/defaultRoutes");
const postRouter = require("./routes/postRoutes");
const { pool } = require("./database/db");

app.set("view engine", "ejs"); //setting templating engine
app.set("views", path.join(__dirname, "views")); //addressing my templates

//using middlewares for incoming requests
app.use(express.urlencoded({ extended: false })); // decoding urlencode HTTP request
app.use((req, res, next) => {
    const nonce = crypto.randomUUID();
    res.locals.nonce = nonce;
    res.setHeader(
        "Content-Security-Policy",
        `default-src 'self'; style-src 'self' nonce-${nonce} ; script-src nonce-${nonce}`,
    );
    next();
});
app.use("/static", express.static("public")); //serving static files from public folder and with virtual path prefix named static
// app.use(compression());
// adding route handlers
app.use("/", defaultRouter);
app.use("/posts", postRouter);

// server-side error-handlre middleware
app.use((error, req, res, next) => {
  if (error) {
    errorLog(error?.message);
    res.status(500).render("500");
  }
});

//client-side error-handlre middleware
app.use((req, res) => {
  res.status(400).render("404"); // page not found error handlre
});


// async function startServer(){
//     try {
//         log("here")
//         const connection = await pool.getConnection();
//         app.listen(3000,()=>{
//             log('starting the server')
//             connection?.release()
//         }); // server is running on port 3000 on dev mode

//     } catch (error) {
//         errorLog(error.cause);
//         console.log(error.stack);
//         errorLog('server is down');
//         process.exit(1);
//     }
// }

app.listen(3000);

// startServer();
