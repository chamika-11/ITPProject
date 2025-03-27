const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrescriptionSchema = new mongoose.Schema(
  {
    medicines: [
      {
        medicineName: {
          type: String,
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        instructions: {
          type: String,
          required: true,
        },
      },
    ],
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    dateIssued: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  { collection: "prescription" }
);

module.exports = mongoose.model("Prescription", PrescriptionSchema);
