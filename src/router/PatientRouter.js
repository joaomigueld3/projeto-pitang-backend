import express from "express";
import PatientController from "../controller/PatientController.js";

const patientController = new PatientController();

const router = express.Router();


router.get("/api/patient", patientController.index);
router.get("/api/patient/:id", patientController.getOne);
router.post("/api/patient", patientController.store);
router.put("/api/patient/:id", patientController.update);
router.delete("/api/patient/:id", patientController.remove);

export default router;
