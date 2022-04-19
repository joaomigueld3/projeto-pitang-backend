import express from "express";
import AppointmentController from "../controller/AppointmentController.js";

const appointmentController = new AppointmentController();

const router = express.Router();


router.get("/api/appointments", appointmentController.index);
router.get("/api/appointments/:id", appointmentController.getOne);
router.post("/api/appointments", appointmentController.store);
router.put("/api/appointments/:id", appointmentController.update);
router.delete("/api/appointments/:id", appointmentController.remove);

export default router;
