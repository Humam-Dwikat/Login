const mysql=require("mysql");
const DB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login =(req, res) =>{
    console.log(req.body);
    const{ password, email} = req.body;

    DB.query('SELECT email,password FROM user WHERE password=?  AND email=? ',[password ,email],(error,results) => {
        console.log(results.length);
        if(error){
            console.log(error);
        }else{
            if(results.length==1){
                return res.render('account', {
                    });
            }
            else{ return res.render('login', {
                message: 'there is  something wrong'
                });}
            }  
    })

};

