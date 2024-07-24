import express from "express";
import {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
} from "../controllers/faculty.controller";
import {
  requireAuthorization,
  requireAuthentication,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/",
  requireAuthentication,
  requireAuthorization("faculty"),
  createFaculty
);
router.get("/:id", requireAuthentication, getFacultyById);

router.get("/", requireAuthentication, getAllFaculties);

router.patch(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty"),
  updateFacultyById
);

router.delete(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty"),
  deleteFacultyById
);

export default router;
