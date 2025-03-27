import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./pss.css";

const PrescriptionSearch = () => {
  const [patientId, setPatientId] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    console.log("Searching");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/prescription/search/${patientId}`
      );
      setPrescriptions(response.data.prescriptions);
    } catch (err) {
      console.error("Error fetching prescriptions:", err);
      setError("Failed to fetch prescriptions. Please check the patient ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/*<h1>Search Prescriptions by Patient ID</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>*/}

      <div className="my-search">
        <div class="search-box">
          <button class="btn-search" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            class="input-search"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {prescriptions.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date Issued</th>
              <th>Valid Until</th>
              <th>Notes</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {prescriptions.length === 0 && !loading && !error && (
        <p>No prescriptions found for the given patient ID.</p>
      )}
    </div>
  );
};

export default PrescriptionSearch;
