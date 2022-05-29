const app = require("express").Router();
const bodyParser = require('body-parser');
var bodyParserurl = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());
var db = require("../db")

email="Admin@test"

app.get('/getAllDoctor',async(request,response)=>{
    if(email=="Admin@test"){
    let [result,rows] = await db.connection.execute("SELECT * FROM doctor");
     response.status(200).json(result);
    }
  });
  
  
  app.delete("/deleteDoctor/:id", async (req, res) => {
    if(email=="Admin@test"){
    try {
      const { id } = req.params;
      const Delete = await db.connection.query("DELETE FROM doctor WHERE idDoctor = ?", [id]);
      res.status(200).json("Delete Doctor");
    } 
    
    catch (err) {
      console.log(err.message);
    }
}
  });



  app.get('/getAllPatients',async(request,response)=>{
    if(email=="Admin@test"){
    let [result,rows] = await db.connection.execute("SELECT * FROM patients");
     response.status(200).json(result);
    }
  });
  
  
  app.delete("/deletePatients/:id", async (req, res) => {
    if(email=="Admin@test"){
    try {
      const { id } = req.params;
      const Delete = await db.connection.query("DELETE FROM patients WHERE Id = ?", [id]);
      res.status(200).json("Delete Patients");
    } 
    
    catch (err) {
      console.log(err.message);
    }
}
  });

  app.get('/getALLappointment',async(request,response)=>{
    if(email=="Admin@test"){
    let [result,rows] = await db.connection.execute("SELECT * FROM appointment");
     response.status(200).json(result);
    }
  });
  

  app.delete("/deleteAppointment/:id", async (req, res) => {
    if(email=="Admin@test"){
    try {
      const { id } = req.params;
      const Delete = await db.connection.query("DELETE FROM appointment WHERE idAppointment = ?", [id]);
      res.status(200).json("Delete Appointment");
    } 
    
    catch (err) {
      console.log(err.message);
    } 
}
  });
  

  module.exports=app;

  
  