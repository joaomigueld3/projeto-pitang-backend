import PatientModel from "../model/PatientModel.js";

class PatientController{
    async getOne(request, response) {
        const id = request.params.id;
    
        try {
          const patient = await PatientModel.findById(id);
    
          if (patient) {
            return response.send(patient);
          }
    
          response.status(404).send({ message: "Patient not found" });
        } catch (error) {
          console.error(error.message);
    
          response.status(400).send({ message: "An unexpected error happened" });
        }
      }


      async index(request, response) {
        const patient = await PatientModel.find();
          if(patient.length==0){
          return response.status(404).json({message: "No patients found"})
         }
         response.send(patient);
       }

       async remove(request, response) {
        const id = request.params.id;
    
        const patient = await PatientModel.findById(id);
    
        if (patient) {
          await patient.remove();
    
          return response.send({ message: "Patient removed" });
        }
    
        response.status(404).send({ message: "Patient not found" });
      }

      async store(request, response) {
        const { name, email, birthDate } = request.body;
        const verifyEmail = await PatientModel.findOne({email});
        if(!verifyEmail){
        const patient = await PatientModel.create({
          name,
          email,
          birthDate,
        });
      
       return response.send({ message: "Patient Created!", user });
      }
      else{
       return response.status(404).send({message: "This email is already being used"});
      }
      }

      async update(){
          
      }
}

export default PatientController;