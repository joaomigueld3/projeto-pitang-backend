import AppointmentModel from "../model/AppointmentModel.js";

class AppointmentController{

    async index(request,response){        
        try{
            const app = await AppointmentModel.find();
            if(app.length==0){
                return response.status(404).json({message:"No appointments found in database"});
            }
            else{
                return response.send(app);
            }
            
        }catch(error){
            console.log(error.message);
            response.status(400).send({ message: "An unexpected error happened" });
        }
    }

    async getOne(request,response){
        const id = request.params.id;

            try{
                const app = await AppointmentModel.findById(id);
                if(app){
                    return response.status(200).send(app);
                }
                else{
                    return response.status(404).json({message:"appointment not found!"});
                }
            }catch(error){
                    console.log(error.message);
                    response.status(400).send({ message: "An unexpected error happened" });
            }
    }
    async store(request,response){
        const{name, cpf, email, birthDate, appDate,appTime, report}=request.body;

            try{
                const verifyApp = await AppointmentModel.findOne({email});
                const verifyCpf = await AppointmentModel.findOne({cpf});
                if(!verifyApp && !verifyCpf){
                    const checkDay = await AppointmentModel.findOne({appDate:appDate});
                    console.log({checkDay});
                        //if someone already booked an app this day
                        if(checkDay){
                            console.log(checkDay);
                            const appTimeNew=checkDay.appTime;
                            console.log(checkDay.appTime)
                            console.log(appTime);
                            console.log(appTimeNew);
                            
                            if(appTime===appTimeNew){
                                return response.status(400).send(
                                    {message:"another appointment is already booked for this day and time"});
                            }
                        }
                    
                    const app = await AppointmentModel.create({
                        name,
                        cpf,
                        email,
                        birthDate,
                        appDate,
                        appTime,
                        isSolved:false,
                        report,
                    });
                    return response.status(200).send({message:"Appointment registred with success", app});
                }else{
                    return response.status(404).json({message:"email or CPF already being used"});
                }
            }catch(error){                
                if (error.name === "ValidationError") {
                    let errors = {};
              
                    Object.keys(error.errors).forEach((key) => {
                      errors[key] = error.errors[key].message;
                    });
                    console.log(errors)
                    return response.status(400).send({message: JSON.stringify(errors)});
                  }
                console.log(error.message);
                response.status(400).send({message: error.message});
        }
    }
    async remove(request,response){
        const id = request.params.id;
        try{
            const verifyApp = await AppointmentModel.findById(id);
            if(verifyApp){
                await verifyApp.remove();
                return response.status(200).send({ message: "Appointment removed" });
            }else{
                response.status(404).send({ message: "Appointment not found, therefore can't be removed" });
            }

        }catch(error){
            console.log(error.message);
            response.status(400).send({ message: "An unexpected error happened" });
        }
    }
    async update(request,response){
        const id=request.params.id;
        const{isSolved, report}=request.body;
        try{
            const verifyApp = await AppointmentModel.findById(id);
            if(verifyApp){
               const app = await AppointmentModel.findByIdAndUpdate(id,
                    {
                        isSolved,
                        report,
                    },
                    {
                        new:true,
                    });
                    return response.status(200).send({message:"Appointment updated with success",app});
            }   else{
                   return response.status(404).send({ message: "Appointment not found, therefore can't be updated" });
            }
        }catch(error){
            console.log(error.message);
            response.status(400).send({ message: "An unexpected error happened" });
        }
    }
}

export default AppointmentController;