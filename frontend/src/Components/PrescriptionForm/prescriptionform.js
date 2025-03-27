import React, { useState } from "react";
import axios from "axios";
import "./prescriptionform.css";

const PrescriptionForm = ({ doctorId, patientId }) => {
  const [prescriptionData, setPrescriptionData] = useState({
    doctorId: "",
    patientId: "",
    medicines: [{ medicineName: "", dosage: "", frequency: "", quantity: "", instructions: "" }],
    dateIssued: new Date().toISOString().split("T")[0],
    validUntil: "",
    notes: "",
  });

  const handleInputChange = (e, field, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedMedicines = prescriptionData.medicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      );
      setPrescriptionData({ ...prescriptionData, medicines: updatedMedicines });
    } else {
      setPrescriptionData({ ...prescriptionData, [name]: value }); // Update doctorId and patientId here
    }
  };

  const addMedicine = () => {
    setPrescriptionData({
      ...prescriptionData,
      medicines: [...prescriptionData.medicines, { medicineName: "", dosage: "", frequency: "", quantity: "", instructions: "" }],
    });
  };

  const removeMedicine = (index) => {
    const updatedMedicines = prescriptionData.medicines.filter((_, i) => i !== index);
    setPrescriptionData({ ...prescriptionData, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/prescription", {
        ...prescriptionData, // Include all fields from prescriptionData
      });
  
      alert("Prescription submitted successfully!");
      console.log("Server Response:", response.data);
  
      // Reset form after submission
      setPrescriptionData({
        medicines: [{ medicineName: "", dosage: "", frequency: "", quantity: "", instructions: "" }],
        doctorId: "",
        patientId: "",
        dateIssued: new Date().toISOString().split("T")[0],
        validUntil: "",
        notes: "",
      });
    } catch (error) {
      console.error("Error submitting prescription:", error.response?.data || error.message);
      alert("Failed to submit prescription");
    }
  };

  return (
    <div className="prescription-container">
      <div className="prescription-card">
        <h2>Create Prescription</h2>
        <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Doctor ID:</label>
    <input
      type="text"
      name="doctorId"
      value={prescriptionData.doctorId}
      onChange={handleInputChange}
      required
    />
  </div>
  
  <div className="form-group">
    <label>Patient ID:</label>
    <input
      type="text"
      name="patientId"
      value={prescriptionData.patientId}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="form-group">
    <label>Date Issued:</label>
    <input
      type="date"
      name="dateIssued"
      value={prescriptionData.dateIssued}
      onChange={handleInputChange}
    />
  </div>
  
  <div className="form-group">
    <label>Valid Until:</label>
    <input
      type="date"
      name="validUntil"
      value={prescriptionData.validUntil}
      onChange={handleInputChange}
      required
    />
  </div>
          <div className="medicines-section">
            {prescriptionData.medicines.map((med, index) => (
              <div key={index} className="medicine">
                {["medicineName", "dosage", "frequency", "quantity", "instructions"].map((field) => (
                  <input
                    key={field}
                    type={field === "quantity" ? "number" : "text"}
                    value={med[field]}
                    onChange={(e) => handleInputChange(e, field, index)}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required={field !== "frequency"}
                  />
                ))}
                {prescriptionData.medicines.length > 1 && (
                  <button type="button" onClick={() => removeMedicine(index)} className="remove-medicine-button">
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addMedicine} className="add-medicine-button">
              Add Medicine
            </button>
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              name="notes"
              value={prescriptionData.notes}
              onChange={handleInputChange}
              placeholder="Enter additional notes"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit Prescription
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
