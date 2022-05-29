var express = require('express');
var app = express();


const appointment = require("./Pages/Appointment");
const doctor = require("./Pages/Doctor");
const patients = require("./Pages/Patients.JS");
//const login = require("./Pages/Auth");
const Admin = require("./Pages/Admin");


//app.use("/Auth/",login)
app.use("/Admin/",Admin)
app.use("/Appointment/",appointment)
app.use("/Doctor/",doctor)
app.use("/Patients/",patients)



app.listen(3100,()=>{
    console.log(`Server running in port ${3100}/`);
})
