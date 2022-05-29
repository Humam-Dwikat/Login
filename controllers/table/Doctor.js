const app = require("express").Router();
const bodyParser = require('body-parser');
var bodyParserurl = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
var db = require("../db")


app.post('/Create/Doctor',bodyParserurl, async (req, res) => {
    const userDetails = req.body;
    var sql = 'INSERT INTO doctor SET ?';
    try {
        await  db.connection.query(sql, userDetails,function (err, data) { 
          if (err) throw err;
             console.log("User successfully "); 
           });
  
        res.status(201).send(userDetails);
    } catch (error) {
      console.log("Falid")
        res.status(500).send(error);
    }
  })
  
  
  app.get('/get_Doctor',async(request,response)=>{
    
    let [result,rows] = await db.connection.execute("SELECT * FROM doctor");
     response.status(200).json(result);
  });
  
  
  app.delete("/delete_doctor/:id", async (req, res) => {
  
    try {
      const { id } = req.params;
      const Delete = await db.connection.query("DELETE FROM doctor WHERE idDoctor = ?", [id]);
      res.status(200).json("row deleted");
    } 
    
    catch (err) {
      console.log(err.message);
    }
  });
  
  
  app.put("/EditDoctor/:id", bodyParserurl, function (req, res) {
    var { id } = req.params;
    var sql = `UPDATE doctor SET PhoneNumber  = ? ,Email = ?, Name = ?  WHERE idDoctor=${id}`;
    db.connection.query(sql, [req.body.PhoneNumber, req.body.Email, req.body.Name], function (err, data) {
      if (err) throw err;
               console.log("Edit successfully "); 
             });
  });
  


module.exports=app;
