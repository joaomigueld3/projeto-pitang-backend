import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cpf:{type: [String], required: true},
    email: { type: String, required: true },
    birthDate: {type: Date,required: true},
    appDate:{ type: String, required: true },
    appTime:{ type: String, enum:["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],
     required: true },
    isSolved:{type: Boolean, default:false},
    phones: [String],
    },
  {
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model("appointment", AppointmentSchema);

export default AppointmentModel;