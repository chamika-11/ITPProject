import React from "react";
import "./DoctorPrescriptionView.css";

const DoctorPrescriptionView = ({ prescriptionData }) => {
  return (
    <div className="prescription-view-container">
      <div className="prescription-header">
        <h2>Prescription</h2>
      </div>
      <div className="prescription-details">
        {/* Doctor's Info */}
        <div className="info-section">
          <h3>Doctor's Name</h3>
          <p>{prescriptionData.doctorName}</p>
        </div>

        {/* Patient's Info */}
        <div className="info-section">
          <h3>Patient's Name</h3>
          <p>{prescriptionData.patientName}</p>
        </div>

        {/* Patient's Diagnosis (Doctor's view) */}
        <div className="info-section">
          <h3>Diagnosis</h3>
          <p>{prescriptionData.diagnosis}</p>
        </div>

        {/* Prescription Date (Doctor's view) */}
        <div className="info-section">
          <h3>Prescription Date</h3>
          <p>{new Date(prescriptionData.prescriptionDate).toLocaleDateString()}</p>
        </div>

        {/* Medicines */}
        <div className="medicines-section">
          <h3>Medicines</h3>
          {prescriptionData.medicines.map((med, index) => (
            <div key={index} className="medicine-details">
              <p><strong>Medicine Name:</strong> {med.medicineName}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
              <p><strong>Frequency:</strong> {med.frequency}</p>
              <p><strong>Quantity:</strong> {med.quantity}</p>
              <p><strong>Instructions:</strong> {med.instructions}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {prescriptionData.notes && (
          <div className="notes-section">
            <h3>Notes</h3>
            <p>{prescriptionData.notes}</p>
          </div>
        )}

        {/* Follow-Up Appointment (Doctor's view) */}
        {prescriptionData.followUpDate && (
          <div className="info-section">
            <h3>Follow-Up Appointment</h3>
            <p>{new Date(prescriptionData.followUpDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPrescriptionView;
