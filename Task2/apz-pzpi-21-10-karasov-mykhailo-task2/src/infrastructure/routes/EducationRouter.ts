import express from "express";
import educationController from "../controllers/EducationController";
import createEducationValidator from "../../core/common/validators/CreateEducationValidator";

const router = express.Router();

router.post('/', createEducationValidator(), educationController.createEducation.bind(educationController));

export default router;