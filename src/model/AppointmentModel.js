import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cpf:{type: [String], required: true},
    email: { type: String, required: true },
    birthDate: {type: String,required: true},
    appDate:{ type: String, required: true },
    appTime:{ type: String, required: true },
    isSolved:{type: Boolean, default:false},
    phones: [String],
    },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model("appointment", AppointmentSchema);

export default AppointmentModel;