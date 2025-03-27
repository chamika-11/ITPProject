const prescriptions = require('../Model/PrescriptionModel');



//getallprescription
const getAllPrescription = async (req, res, next) => {
    let allprescription;
    try {
        allprescription = await prescriptions.find()
            .populate('patientId', 'name')
            .populate('doctorId', 'name');
    } catch (err) {
        console.log("Error in getAllPrescription:", err); // Log the error
    return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!allprescription || allprescription.length === 0) {
        return res.status(404).json({ message: "No prescriptions found" });
    }
    
    return res.status(200).json({ prescriptions: allprescription });
};




//Get Prescription by ID
const getPrescriptionById = async (req, res, next) => {
    const id = req.params.id;
    let idprescription;
    try {
        idprescription = await prescriptions.findById(id)
            .populate('patientId', 'name')
            .populate('doctorId', 'name');
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
    
    if (!idprescription) {
        return res.status(404).json({ message: "Prescription not found" });
    }
    
    return res.status(200).json({ idprescription });
};




//create new Prescription
const createPrescription = async (req, res, next) => {
    const { medicines, patientId, doctorId, dateIssued, validUntil, notes } = req.body;
    const newPrescription = new prescriptions({
      medicines,
      patientId,
      doctorId,
      dateIssued,
      validUntil,
      notes
    });
  
    try {
      const savedPrescription = await newPrescription.save();
      res.status(201).json({ prescription: savedPrescription });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: 'Invalid Data',
        error: err.message 
      });
    }
  };




//Update Prescription
const updatePrescription=async(req,res,next) => {
    const id=req.params.id;
    const {
        medicines, 
        patientId, 
        doctorId, 
        dateIssued,
        validUntil,
        notes
    } = req.body;

    let updatedPrescription;
    try{
        updatedPrescription = await prescriptions.findByIdAndUpdate(id,{
            medicines,
            patientId,
            doctorId,
            dateIssued,
            validUntil,
            notes
        },{new:true});
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Invalid Data'});
    }
    if(!updatedPrescription){
        return res.status(404).json({message:"No prescription found"});
    }
    return res.status(200).json({
        message: 'Updated successfully',
        prescription: updatedPrescription
    });
};




//Delete Prescription
const deletePrescription=async(req,res,next) => {
    const id=req.params.id;
    let deletedPrescription;
    try{
        deletedPrescription = await prescriptions.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
        return res.status(400).json({message:'Invalid Data'});
    }
    if(!deletedPrescription){
        return res.status(404).json({message:"No prescription found"});
    }
    return res.status(200).json({message:'Deleted successfully'});
};




//Search prescription
const searchPrescription = async (req, res, next) => {
    const patientId = req.params.patientId; // Get patientId from query parameters
    let searchPrescriptions;
    console.log(patientId);

    try {
        // Find prescriptions by patientId
        searchPrescriptions = await prescriptions.find({ patientId })
            .populate('patientId', 'name address phone')
            .populate('doctorId', 'name phone');
    } catch (err) {
        console.log("Error in searchPrescription:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!searchPrescriptions || searchPrescriptions.length === 0) {
        return res.status(404).json({ message: "No prescriptions found for the given patient" });
    }

    return res.status(200).json({ prescriptions: searchPrescriptions });
};




exports.getAllPrescription=getAllPrescription;
exports.createPrescription=createPrescription;
exports.getPrescriptionById=getPrescriptionById;
exports.updatePrescription=updatePrescription;
exports.deletePrescription=deletePrescription;
exports.searchPrescription=searchPrescription;

