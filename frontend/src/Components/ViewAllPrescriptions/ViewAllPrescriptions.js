import { useEffect, useState } from "react";
import "./ViewAllPrescriptions.css";

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch("http://localhost:5000/Prescription");
                if (!response.ok) {
                    throw new Error("Failed to fetch prescriptions");
                }
                const data = await response.json();
                setPrescriptions(data.prescriptions);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPrescriptions();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container">
        <h2>Prescriptions</h2>
        <div className="prescription-grid">
        {prescriptions.map((prescription) => (
            <div key={prescription._id} className="prescription-card">
                <h3>Patient: {prescription.patientId.name}</h3>
                <p>Address: {prescription.patientId.address}</p>
                <p>Phone: {prescription.patientId.phone}</p>
                <h4>Doctor: {prescription.doctorId.name}</h4>
                <p>Doctor Contact: {prescription.doctorId.phone}</p>
                <p>Issued On: {new Date(prescription.dateIssued).toLocaleDateString()}</p>
                <p>Valid Until: {new Date(prescription.validUntil).toLocaleDateString()}</p>
                <p>Notes: {prescription.notes}</p>
                <h4>Medicines:</h4>
                <ul className="medicine-list">
                    {prescription.medicines.map((med, index) => (
                        <li key={index}>
                            {med.medicineName} - {med.dosage}, {med.frequency} ({med.quantity} units)
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
</div>

    );
};

export default PrescriptionList;
