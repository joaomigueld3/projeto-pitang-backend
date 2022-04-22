import mongoose from "mongoose";




const AppointmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 50, message:'Max length accepted for NAME is 50' },
    cpf:{type: String, required: true, minlength:11, maxlength:11 , error: 'CPF must be have exactly 11 characters'},
    email: { type: String, required: true, maxlength:50, message:'Max length accepted for EMAIL is 50' },
    birthDate: {type: Date, required: true, max:Date.now()},
    appDate:{ type: String, required: true, minlength:10, maxlength:10, validate: validatorDate, message:'Appointment Date must be in th format 2022-04-01' },
    appTime:{ type: String, enum:["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],
     required: true, message:'Appointment Time must be in the format 8:00 or 10:00' },
    isSolved:{type: Boolean, default:false},
    phones: {type:String, maxlength: 20, message:'Phone Number must have at most 14 characters '},
    },
  {
    timestamps: true,
  }
);

function validatorDate(date){
  const splitDate =date.split("-");
  const year=parseInt(splitDate[0]);
  const month=parseInt(splitDate[1]);
  const day=parseInt(splitDate[2]);
  if(year<2022 || year>2060){
    throw new Error('year must be beteween 2022 and 2060');
  }
  else if(month<1 || month>12){
    throw new Error("month must be beetween 01 and 12");
  }
  else if(day<1 || day>31){
    throw new Error("day must be beetween 01 and 31");
  }
  else if((month==4 || month==6 || month==9 || month==11) && day>30){
    throw new Error("Apr, Jun, Set, Nov only have 30 days");
  }
  else if(month==2 && day>28){
    throw new Error("Feb only have 28 days");
  }
  console.log("splitted appDate: "+splitDate)
  }
  
const AppointmentModel = mongoose.model("appointment", AppointmentSchema);

export default AppointmentModel;