import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrescriptionView = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/UpdatePrescription"); // Navigate to the "About" component
  };

  // Fetch prescriptions from the backend
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/prescription/doctor/67739b863c75615f3d2a735f"
        ); // Update the URL if needed
        setPrescriptions(response.data.prescriptions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
        setError("Failed to fetch prescriptions");
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  // Function to delete a prescription
  const deletePrescription = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/prescription/${id}`);
      alert("Prescription deleted successfully!");
      // Update the state to remove the deleted prescription
      setPrescriptions(
        prescriptions.filter((prescription) => prescription._id !== id)
      );
    } catch (err) {
      console.error("Error deleting prescription:", err);
      alert("Failed to delete prescription");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="prescription-page">
      <h1>Prescriptions</h1>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <table class="prescription-table table table-striped">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Date Issued</th>
              <th scope="col">Valid Until</th>
              <th scope="col">Notes</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription._id}>
                <td>{prescription.patientId?.name || "N/A"}</td>
                <td>{prescription.doctorId?.name || "N/A"}</td>
                <td>
                  {new Date(prescription.dateIssued).toLocaleDateString()}
                </td>
                <td>
                  {new Date(prescription.validUntil).toLocaleDateString()}
                </td>
                <td>{prescription.notes}</td>
                <td>
                <button
                  className="delete-btn"
                  onClick={() => deletePrescription(prescription._id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    padding: '8px 16px',
                    fontSize: '14px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                    marginRight: '10px',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                >
                  Delete
                </button>
                <button
                  className="update-btn"
                  onClick={handleNavigation}
                  style={{
                    backgroundColor: '#3498db',
                    color: '#fff',
                    padding: '8px 16px',
                    fontSize: '14px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#2980b9')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#3498db')}
                >
                  Update
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PrescriptionView;
