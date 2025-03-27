const express= require("express")
const router=express.Router();


const prescriptionController=require('../Controller/PrescriptionController');

//Controller Functions
//router.get('/',prescriptionController.getAllPrescription);
router.get('/doctor/:doctorId', prescriptionController.getAllPrescription);
router.post('/',prescriptionController.createPrescription);
router.get('/:id',prescriptionController.getPrescriptionById);
router.put('/:id',prescriptionController.updatePrescription);
router.delete('/:id',prescriptionController.deletePrescription);
router.get('/search/:patientId', prescriptionController.searchPrescription);

module.exports=router;