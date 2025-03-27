const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{type:"string", required:true},
    fullName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    role: { type: String,enum: ["user","nurse","admin", "doctor"], default: "user" },
    createdDate: { type: Date, default: Date.now }, 
    modifiedDate: { type: Date }, 
});



module.exports = mongoose.model("User", userSchema);