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
        const{name, cpf, email, birthDate, appDate,appTime, phones}=request.body;

            try{
                const verifyApp = await AppointmentModel.findOne({email});
                if(!verifyApp){
                    const app = await AppointmentModel.create({
                        name,
                        cpf,
                        email,
                        birthDate,
                        appDate,
                        appTime,
                        phones,
                        isSolved:false,
                    });
                   return response.status(200).send({message:"Appointment registred with success", app});
                }else{
                    return response.status(404).json({message:"email already being used"});
                }
            }catch(error){
                console.log(error.message);
                response.status(400).send({ message: "An unexpected error happened" });
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
        const{name, cpf, email,isSolved}=request.body;
        try{
            const verifyApp = await AppointmentModel.findById(id);
            if(verifyApp){
                verifyApp = await AppointmentModel.findByIdAndUpdate(id,
                    {
                        name, 
                        cpf,
                        email,
                        isSolved,
                    },
                    {
                        new:true,
                    });
                    return response.status(200).send({message:"Appointment updated with success",verifyApp});
            }   else{
                    response.status(404).send({ message: "Appointment not found, therefore can't be updated" });
            }
        }catch(error){
            console.log(error.message);
            response.status(400).send({ message: "An unexpected error happened" });
        }
    }
}

export default AppointmentController;