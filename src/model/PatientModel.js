import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: String,
    
    },
  {
    timestamps: true,
  }
);

const PatientModel = mongoose.model("patient", PatientSchema);

export default PatientModel;
