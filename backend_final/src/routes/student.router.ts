import express from "express";
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
} from "../controllers/student.controller";
import {
  requireAuthentication,
  requireAuthorization,
} from "../middleware/auth.middleware";
import upload from "../middleware/uploadMiddleware";

const router = express.Router();

// Create a new student (requires authentication)
router.post(
  "/",
  requireAuthentication,
  upload.single("profileImg"),
  createStudent
);

// Get all students (requires authentication)
router.get("/", requireAuthentication, getAllStudents);

// Get student by ID (requires authentication)
router.get("/:id", requireAuthentication, getStudentById);

// Update student by ID (requires authentication)
router.put(
  "/:id",
  requireAuthentication,
  upload.single("profileImg"),
  updateStudentById
);

// Delete student by ID (requires authentication)
router.delete("/:id", requireAuthentication, deleteStudentById);

export default router;
