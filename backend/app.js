console.log("Starting")


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv/config");

const app = express();
const routerPrescription=require('./Route/PrescriptionRoute');
const routerGimini = require('./Route/GiminiRoute');


//Middleware
app.use(express.json());
app.use(cors());
app.use("/prescription",routerPrescription);

require('./geminiApi');
app.use("/api",routerGimini);

//Missing middleware


mongoose.connect("mongodb+srv://ravabstergo:LznenoeEeCWLy93u@itp.rejo3.mongodb.net/?retryWrites=true&w=majority&appName=ITP")
.then(()=>console.log("Database Connected")).then(()=>{
    app.listen(5000);
})
.catch((err) => console.log(err));