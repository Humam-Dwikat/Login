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
    //takeed the user details and stored in the variables  
    
    DB.query('SELECT email FROM user WHERE email = ?',[email],(error,results) => {
        //check the email in database if is exist
        if(error){
            console.log(error);
        //show the error if there is exist

        }
        if(name==''||email==''||password==''||passwordConfirm==''){
            //check if the user entered his info
            return res.render('register', {
                //if No will show the register page and show the message to tell you there is error
                message: "you can't register without entering request info"
                });
            }

        if(results.length>0){
            //cheke if email already exist
            return res.render('register', {
                message: "the email is already exist"
                //if yes wiil show this message "the email is already exist
                });
        }
        
             if(password != passwordConfirm){
                 //check if the password and password Confirm is identical
                return res.render('register', {
                message: 'Passwords do not match'
                });
                //if NO will go to else
                
        }
        else{
            DB.query('INSERT INTO user SET ?',{name:name,email:email,password:password,passwordConfirm:passwordConfirm},(error,results)=>{
            //Since all conditions is checked ,the info will insert in the database
                if(error)
                 {console.log(error)}
                else{
                    return res.render('register',{
                        message:'Done'
                        //if the process is done it will show the register page and message: Done
                    });
        
                }
        
            })
        }
    });
    
}

