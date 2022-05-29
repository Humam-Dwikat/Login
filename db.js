
var mysql=require("mysql2/promise");

module.exports=db={};

connection();
async function connection(){
var dbcon=await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1111",
    database:"mydb",
});

dbcon.connect(function(err){
    if(err) throw err;
    console.log('Connected');
})

db.connection = dbcon;
}







