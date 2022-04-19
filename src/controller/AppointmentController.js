import AppointmentntModel from "../model/AppointmentModel";

class AppointmentController{

    async index(request,response){        
        try{
            const app = await AppointmentntModel.find();
            if(app.length==0){
                return response.status(404).json({message:"no appointments found in database"});
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
        const email = request.params.email;

            try{
                const app = await AppointmentntModel.findByOne(email);
                if(app){
                    return response.send(app);
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
        const{name, cpf, email, birtDate, appDate,appTime, phones,isSolved}=request.body;

            try{
                const app = await AppointmentntModel.findByOne(email);
                if(!app){
                    //create one
                }else{
                    return response.status(404).json({message:"email already being used"});
                }
            }catch(error){
                console.log(error.message);
                response.status(400).send({ message: "An unexpected error happened" });
        }
    }
    async remove(){

    }
    async update(){

    }
}

export default AppointmentController;