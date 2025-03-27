import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrescriptionForm from './Components/PrescriptionForm/prescriptionform';
import PrescriptionView from './Components/PrescriptionView/PrescriptionView';
import UpdatePrescription from './Components/UpdatePrescription/UpdatePrescription';
import GiminiApi from './Components/GiminiApi/GiminiApi';
import PrescriptionSearch from "./Components/PrescriptionSearch/PrescriptionSearch";
import Navbar from './Components/NavBar/Navbar';
import './App.css';
import { StrictMode } from 'react';

function App() {
  return (
    <Router>
      <StrictMode>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/prescription" element={<PrescriptionForm />} />
            <Route path="/PrescriptionView" element={<PrescriptionView />} />
            <Route path="/UpdatePrescription" element={<UpdatePrescription />} />
            <Route path="/GiminiApi" element={<GiminiApi />} />
            <Route path="/search" element={<PrescriptionSearch />} />
            </Routes>
        </div>
      </div>
      </StrictMode>
    </Router>
  );
}

export default App;
