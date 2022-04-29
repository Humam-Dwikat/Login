const express=require("express");
const path = require('path');
const mysql=require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path:'./.env'});

const app = express();

const DB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

DB.connect((error)=>{
    if(error){console.log(error);
    }else{
        console.log("MYSQL is Connected...");
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/logauth', require('./routes/logauth'));

app.listen(4000,()=>{
    console.log("Hello we are in the Port 4000");
})