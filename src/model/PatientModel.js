import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: Date,
    
    },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model("Patient", PatientSchema);

export default PatientModel;
