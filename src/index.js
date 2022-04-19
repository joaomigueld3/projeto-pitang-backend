import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";


dotenv.config({path:'.env.example'});

import PatientRouter from "./router/PatientRouter.js";
import AppointmentRouter from "./router/AppointmentRouter.js"

const {DATABASE_URL, PORT} = process.env;
mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("Database Connected...");
  })
  .catch((error) => {
    console.error("Error to connect to database: " + error.message);
  });

  const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(morgan("dev"));

app.use(AppointmentRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
  });