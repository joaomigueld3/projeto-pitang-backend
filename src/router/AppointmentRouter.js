import express from "express";
import AppointmentController from "../controller/AppointmentController.js";

const appointmentController = new AppointmentController();

const router = express.Router();


router.get("/api/appointment", appointmentController.index);
router.get("/api/appointment/:id", appointmentController.getOne);
router.post("/api/appointment", appointmentController.store);
router.put("/api/appointment/:id", appointmentController.update);
router.delete("/api/appointment/:id", appointmentController.remove);

export default router;
