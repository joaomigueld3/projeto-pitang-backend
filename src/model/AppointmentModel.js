import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cpf:{type: [String], required: true},
    email: { type: String, required: true },
    birthDate: {type: String,required: true},
    appDate:{ type: String, required: true },
    appTime:{ type: String, required: true },
    isSolved:Boolean,
    phones: [String],
    },
  {
    timestamps: true,
  }
);

const AppointmentntModel = mongoose.model("appointment", AppointmentSchema);

export default AppointmentntModel;