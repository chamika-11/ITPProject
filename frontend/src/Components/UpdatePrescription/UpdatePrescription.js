import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdatePrescription.css"; 

const UpdatePrescription = () => {
  const { id } = useParams(); // 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    medicines: [],
    patientId: "",
    doctorId: "",
    dateIssued: "",
    validUntil: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the prescription data
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/prescription/${id}`);
        const prescription = response.data.idprescription;

        setFormData({
          ...prescription,
          medicines: prescription.medicines || [],
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prescription:", err);
        setError("Failed to fetch prescription");
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/prescription/${id}`, formData);
      alert("Prescription updated successfully!");
      navigate("/PrescriptionView"); // Redirect back to the prescription view
    } catch (err) {
      console.error("Error updating prescription:", err);
      alert(`Failed to update prescription: ${err.message}`);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle medicine field changes
  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][field] = value;
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  // Add a new medicine
  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [
        ...formData.medicines,
        { medicineName: "", dosage: "", quantity: 0, frequency: "" },
      ],
    });
  };

  // Remove a medicine
  const removeMedicine = (index) => {
    const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
    className="update-prescription-page"
    style={{ padding: "20px", background: "linear-gradient(90deg, rgba(2, 0, 36, 1) 18%, rgba(9, 9, 121, 1) 100%, rgba(0, 212, 255, 1) 100%)" }}
  >
      <form className="update-prescription-form" onSubmit={handleSubmit}>
        <h1>Update Prescription</h1>

        <div className="form-group">
          <label htmlFor="patientId">Patient ID</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="doctorId">Doctor ID</label>
          <input
            type="text"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateIssued">Date Issued</label>
          <input
            type="date"
            id="dateIssued"
            name="dateIssued"
            value={formData.dateIssued.split("T")[0]} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="validUntil">Valid Until</label>
          <input
            type="date"
            id="validUntil"
            name="validUntil"
            value={formData.validUntil.split("T")[0]}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <h2>Medicines</h2>
        {formData.medicines.map((medicine, index) => (
          <div key={index} className="medicine-group">
            <div className="form-group">
              <label>Medicine Name</label>
              <input
                type="text"
                value={medicine.medicineName}
                onChange={(e) =>
                  handleMedicineChange(index, "medicineName", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Dosage</label>
              <input
                type="text"
                value={medicine.dosage}
                onChange={(e) =>
                  handleMedicineChange(index, "dosage", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={medicine.quantity}
                onChange={(e) =>
                  handleMedicineChange(index, "quantity", e.target.value)
                }
              />
            </div>
            <div className="form-group">
              <label>Frequency</label>
              <input
                type="text"
                value={medicine.frequency}
                onChange={(e) =>
                  handleMedicineChange(index, "frequency", e.target.value)
                }
              />
            </div>
            <button
              type="button"
              style={{
                backgroundColor: "#f44336",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100px",
                height: "40px",
                whiteSpace: "normal", // Allow text to wrap
                textAlign: "center",
              }}
              onClick={() => removeMedicine(index)}
            >
              Remove Medicine
            </button>
          </div>
        ))}

        <button
          type="button"
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100px",
            height: "40px",
            whiteSpace: "normal", // Allow text to wrap
            textAlign: "center",
            marginTop: "10px"
          }}
          onClick={addMedicine}
        >
          Add Medicine
        </button>

        {/* Button Group for Update and Cancel */}
        <div style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#008CBA",
              color: "white",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "200px",
              whiteSpace: "normal",
              textAlign: "center",
            }}
          >
            Update
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px 30px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "200px",
              whiteSpace: "normal",
              textAlign: "center",
            }}
            onClick={() => navigate("/PrescriptionView")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePrescription;