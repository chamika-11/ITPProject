import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdatePrescription.css";

const UpdatePrescription = ({ prescriptionId }) => {
  const [prescriptionData, setPrescriptionData] = useState({
    doctorId: "",
    patientId: "",
    medicines: [{ medicineName: "", dosage: "", frequency: "", quantity: "", instructions: "" }],
    dateIssued: "",
    validUntil: "",
    notes: "",
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/prescription/${prescriptionId}`);
        setPrescriptionData(response.data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };
    fetchPrescription();
  }, [prescriptionId]);

  const handleInputChange = (e, field, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const updatedMedicines = prescriptionData.medicines.map((med, i) =>
        i === index ? { ...med, [field]: value } : med
      );
      setPrescriptionData({ ...prescriptionData, medicines: updatedMedicines });
    } else {
      setPrescriptionData({ ...prescriptionData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/prescription/${prescriptionId}`, prescriptionData);
      alert("Prescription updated successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error updating prescription:", error);
      alert("Failed to update prescription");
    }
  };

  return (
    <div className="prescription-container">
      <div className="prescription-card">
        <h2>Update Prescription</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Doctor ID:</label>
            <input type="text" name="doctorId" value={prescriptionData.doctorId} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Patient ID:</label>
            <input type="text" name="patientId" value={prescriptionData.patientId} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Date Issued:</label>
            <input type="date" name="dateIssued" value={prescriptionData.dateIssued} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Valid Until:</label>
            <input type="date" name="validUntil" value={prescriptionData.validUntil} onChange={handleInputChange} required />
          </div>
          <div className="medicines-section">
            {prescriptionData.medicines.map((med, index) => (
              <div key={index} className="medicine">
                {['medicineName', 'dosage', 'frequency', 'quantity', 'instructions'].map((field) => (
                  <input
                    key={field}
                    type={field === "quantity" ? "number" : "text"}
                    value={med[field]}
                    onChange={(e) => handleInputChange(e, field, index)}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required={field !== "frequency"}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea name="notes" value={prescriptionData.notes} onChange={handleInputChange} placeholder="Enter additional notes" required />
          </div>
          <button type="submit" className="submit-button">Update Prescription</button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePrescription;