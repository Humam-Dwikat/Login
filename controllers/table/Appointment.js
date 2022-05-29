const app = require("express").Router();
const bodyParser = require('body-parser');
var bodyParserurl = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
var db = require("../db")


app.post('/createappointment',bodyParserurl, async (req, res) => {
    const userDetails = req.body;
    let sql = "INSERT INTO appointment(PhonePatient,PatientName,NameDoctor) VALUES (?,?,?) ";
   
    try {
        await  db.connection.query(sql, [req.body.PhonePatient, req.body.PatientName ,req.body.NameDoctor ],function (err, data) { 
          if (err) throw err;
             console.log("User successfully "); 
           });
  
        res.status(201).send(userDetails);
    } catch (error) {
      console.log("Falid")
        res.status(500).send(error);
    }
  })


  app.get('/get_appointment',async(request,response)=>{
   
    let [result,rows] = await db.connection.execute("SELECT * FROM appointment");
     response.status(200).json(result);
  });
  

  app.delete("/delete_appointment/:id", async (req, res) => {

    try {
      const { id } = req.params;
      const Delete = await db.connection.query("DELETE FROM appointment WHERE idAppointment = ?", [id]);
      res.status(200).json("row deleted");
    } 
    
    catch (err) {
      console.log(err.message);
    }
  });
  

  module.exports=app;
