import express from "express";
import { getFacultyData } from "../controllers/getFacultyDataController";
import { requireAuthentication } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/:facultyId", requireAuthentication, getFacultyData);

export default router;
