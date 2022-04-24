# projeto-pitang-backend

Backend application developed with node.js
Funcionalities and features

To start the application create a db and a collection in mongodb
run 'yarn dev'
Enviroment variables: 'PORT' and 'DATABASE_URL'

API Rest using Express, Middlewares
Database: mongodb
Schema, CRUD and validations with Mongoose
Resquests: GET, POST, PUT, DELETE
POST: receives data from the body and validates all 'required' variables: (name, email, cpf, birthDate, appDate, appTime) checks if there isn't another 'email' and 'cpf' already registred in database, also checks if there isn't another 'Appointment' for that 'appDate' and 'appTime'
'isSolved' and 'report' aren't required.
PUT: receives an 'id' from params, and 'isSolved','report' from the body, if the 'id' exists in the db the user can update 'isSolved' and 'report'
DELETE: receives an 'id' from params, if exists, removes the 'Appointment' 
GET: '/api/appointment' lists all 'Appointments' from the db and lists them by dateAndTime
