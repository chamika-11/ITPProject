import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionView = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch prescriptions from the backend
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/prescription/doctor/67739b863c75615f3d2a735f'); // Update the URL if needed
                setPrescriptions(response.data.prescriptions);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching prescriptions:', err);
                setError('Failed to fetch prescriptions');
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    // Function to delete a prescription
    const deletePrescription = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/prescription/${id}`);
            alert('Prescription deleted successfully!');
            // Update the state to remove the deleted prescription
            setPrescriptions(prescriptions.filter((prescription) => prescription._id !== id));
        } catch (err) {
            console.error('Error deleting prescription:', err);
            alert('Failed to delete prescription');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Prescriptions</h1>
            {prescriptions.length === 0 ? (
                <p>No prescriptions found.</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Doctor Name</th>
                            <th>Date Issued</th>
                            <th>Valid Until</th>
                            <th>Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prescriptions.map((prescription) => (
                            <tr key={prescription._id}>
                                <td>{prescription.patientId?.name || 'N/A'}</td>
                                <td>{prescription.doctorId?.name || 'N/A'}</td>
                                <td>{new Date(prescription.dateIssued).toLocaleDateString()}</td>
                                <td>{new Date(prescription.validUntil).toLocaleDateString()}</td>
                                <td>{prescription.notes}</td>
                                <td>
                                    <button onClick={() => deletePrescription(prescription._id)}>Delete</button>
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