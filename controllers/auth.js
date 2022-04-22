const mysql=require("mysql");
const DB = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register =(req, res) =>{
    console.log(req.body);

    const{ name, email, password, passwordConfirm} = req.body;

    DB.query('SELECT email FROM users WHERE email = ?',[email],(error,results) => {
        if(error){
            console.log(error);
        }
        //we will check if the email is founded
        //write your code here
        //
        if(name==''&&email==''&&password==''&&passwordConfirm==''){
            
            return res.render('register', {
                message: "you can't register without entering request info"
                });
        }
        
             if(password !== passwordConfirm){
                return res.render('register', {
                message: 'Passwords do not match'
                });
                
        }
        else{
            DB.query('INSERT INTO user SET ?',{name:name,email:email,password:password,passwordConfirm:passwordConfirm},(error,results)=>{
                
                if(error)
                 {console.log(results)}
                else{
                    return res.render('register',{
                        message:'Done'
                    });
        
                }
        
            })
        }
    });
    
}