import mongoose from "mongoose";




const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: [50, 'Max length accepted for NAME is 50' ]},
    cpf:{type: String, required: true, minlength:11, maxlength:11 , message: 'CPF must be have exactly 11 characters'},
    email: { type: String, required: true, maxlength:[20, 'Max length accepted for EMAIL is 20'] },
    birthDate: {type: Date, required: true, max:Date.now()},
    appDate:{ type: Date, required: true, 
      validate:{
      validator: date=> date>Date.now(),
      message: props =>`${props.value} error Date, you can't schedule an Appointment to the past.`
    }},
    appTime:{ type: String, enum:["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30",
              "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],
              required: true, message:'Appointment Time must be in the format 08:00 or 10:00' },
    isSolved:{type: Boolean, default:[false, "Only true or false are accepted"]},
    report: {type:String, default:"",maxlength: [30, 'Report must have at most 30 characters ']},
    },
  {
    timestamps: true,
  }
);


const AppointmentModel = mongoose.model("appointment", AppointmentSchema);

export default AppointmentModel;