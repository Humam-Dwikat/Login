const express=require("express");
const path = require('path');
const mysql=require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path:'./.env'});

const app = express();
//here we make a connection with database
const DB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//this hasdaspdajksdp[]
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

DB.connect((error)=>{
    //check the connection with database
    if(error){console.log(error);
    }else{
        console.log("MYSQL is Connected...");
    }
})
//Define Routes
app.use('/', require('./routes/pages'));
//use the pages.js 
app.use('/auth', require('./routes/auth'));
//use the auth.js 
app.use('/logauth', require('./routes/logauth'));
//use the logauth.js

const port=process.env.port||4000;
// the port of the server is 4000
app.listen(port,()=>{
    console.log(`Hello we are in the Port ${port}`);
})