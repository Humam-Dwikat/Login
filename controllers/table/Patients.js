const app = require("express").Router();
const bodyParser = require('body-parser');
var bodyParserurl = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
var db = require("../db")


app.post('/Create/Patients',bodyParserurl, async (req, res) => {
    const userDetails = req.body;
    var sql = 'INSERT INTO patients SET ?';
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
  
  app.get('/getPatients',async(request,response)=>{
    
    let [result,rows] = await db.connection.execute("SELECT * FROM patients");
     response.status(200).json(result);
  });
  
  
  app.delete("/deletePatients/:id", async (req, res) => {
  
    try {
      const { id } = req.params;
      const Delete = await db.connection.query("DELETE FROM patients WHERE Id = ?", [id]);
      res.status(200).json("row deleted");
    } 
    
    catch (err) {
      console.log(err.message);
    }
  });
  
  
  app.put("/EditPatients/:id", bodyParserurl, function (req, res) {
    var { id } = req.params;
    var sql = UPDATE patients SET phone_number  = ? ,Email = ?, full_name = ? , age = ? , gender = ? WHERE Id=${id};
    db.connection.query(sql, [req.body.phone_number, req.body.Email, req.body.full_name, req.body.age,req.body.gender], function (err, data) {
      if (err) throw err;
               console.log("Edit successfully "); 
             });
  });
  
  



module.exports=app;