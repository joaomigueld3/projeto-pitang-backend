import AppointmentModel from '../model/AppointmentModel.js';
import bubbleSort from '../utils/bubbleSort.js';
import sortByDate from '../utils/sortByDate.js';

class AppointmentController {
  async index(request, response) {
    try {
      const app = await AppointmentModel.find();
      if (app.length == 0) {
        return response.status(404).json({ message: 'No appointments found in database' });
      }

      const aux = [];
      for (let i = 0; i < app.length; i++) {
        aux[i] = app[i].appDate;
      }
      console.log(aux);
      // sorted dates
      bubbleSort(aux);
      console.log(aux);
      const aux3 = [];
      // array aux3 with objects sorted by date
      sortByDate(aux, aux3, app);
      const aux4 = aux3;
      for (let i = 0; i < aux3.length; i++) {
        const datetime = new Date(`${aux3[i].appDate.toISOString().slice(0, 11) + aux3[i].appTime}Z`);
        console.log(datetime);
        aux4[i].appDate = datetime;
      }
      console.log(aux4);
      const aux5 = [];
      for (let i = 0; i < aux4.length; i++) {
        aux5[i] = aux4[i].appDate;
      }
      bubbleSort(aux5);
      const aux6 = [];
      sortByDate(aux5, aux6, aux4);
      return response.send(aux6);
    } catch (error) {
      console.log(error.message);
      response.status(400).send({ message: 'An unexpected error happened' });
    }
  }

  async getOne(request, response) {
    const { id } = request.params;

    try {
      const app = await AppointmentModel.findById(id);
      if (app) {
        return response.status(200).send(app);
      }

      return response.status(404).json({ message: 'appointment not found!' });
    } catch (error) {
      console.log(error.message);
      response.status(400).send({ message: 'An unexpected error happened' });
    }
  }

  async store(request, response) {
    const {
      name, cpf, email, birthDate, appDate, appTime, report,
    } = request.body;

    try {
      const verifyApp = await AppointmentModel.findOne({ email });
      const verifyCpf = await AppointmentModel.findOne({ cpf });
      if (!verifyApp && !verifyCpf) {
        const stringToDate = Date.parse(appDate);
        const newDate = new Date(stringToDate);
        console.log(appDate);
        console.log(stringToDate);
        console.log(newDate);
        const checkDay = await AppointmentModel.find({ appDate: newDate });
        console.log({ checkDay });
        // if someone already booked an app this day
        if (checkDay) {
          for (let i = 0; i < checkDay.length; i++) {
            console.log(checkDay);
            const appTimeNew = checkDay[i].appTime;
            console.log(checkDay[i].appTime);
            console.log(appTime);
            console.log(appTimeNew);
            if (appTime === appTimeNew) {
              return response.status(400).send(
                { message: 'another appointment is already booked for this day and time' },
              );
            }
          }
        }

        const app = await AppointmentModel.create({
          name,
          cpf,
          email,
          birthDate,
          appDate,
          appTime,
          isSolved: false,
          report,
        });
        return response.status(200).send({ message: 'Appointment registred with success', app });
      }
      return response.status(404).json({ message: 'email or CPF already being used' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });
        console.log(errors);
        return response.status(400).send({ message: JSON.stringify(errors) });
      }
      console.log(error.message);
      response.status(400).send({ message: error.message });
    }
  }

  async remove(request, response) {
    const { id } = request.params;
    try {
      const verifyApp = await AppointmentModel.findById(id);
      if (verifyApp) {
        await verifyApp.remove();
        return response.status(200).send({ message: 'Appointment removed' });
      }
      response.status(404).send({ message: "Appointment not found, therefore can't be removed" });
    } catch (error) {
      console.log(error.message);
      response.status(400).send({ message: 'An unexpected error happened' });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const { isSolved, report } = request.body;
    try {
      if (report.length > 30) {
        return response.status(404).send({ message: 'Report exceeds maximum length of 30' });
      }
      const verifyApp = await AppointmentModel.findById(id);
      if (verifyApp) {
        const app = await AppointmentModel.findByIdAndUpdate(
          id,
          {
            isSolved,
            report,
          },
          {
            new: true,
          },
        );
        return response.status(200).send({ message: 'Appointment updated with success', app });
      }
      return response.status(404).send({ message: "Appointment not found, therefore can't be updated" });
    } catch (error) {
      console.log(error.message);
      response.status(400).send({ message: error.message });
    }
  }
}

export default AppointmentController;