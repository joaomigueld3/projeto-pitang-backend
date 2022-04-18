import express from "express";
import PatientController from "../controller/PatientController.js";

const patientController = new PatientController();

const router = express.Router();


router.get("/api/patients", patientController.index);
router.get("/api/patients/:id", patientController.getOne);
router.post("/api/patients", patientController.store);
router.put("/api/patients/:id", patientController.update);
router.delete("/api/patients/:id", patientController.remove);

export default router;
