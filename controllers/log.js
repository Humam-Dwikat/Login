const mysql=require("mysql");
const DB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login =(req, res) =>{
    const{ name, email, password, passwordConfirm,ID_Number} = req.body;

    DB.query('SELECT name,email,password,passwordConfirm ,ID_Number FROM user WHERE name=? AND email=? AND password=? AND passwordConfirm=? AND ID_Number=?',[name ,email, password, passwordConfirm,ID_Number],(error,results) => {
        console.log(results.length);
        if(error){
            console.log(error);
        }else{
            if(results.length==1){
                return res.render('index', {
                    });
            }
            else{ return res.render('login', {
                message: 'there is  something wrong'
                });}
            }  
    })

};

