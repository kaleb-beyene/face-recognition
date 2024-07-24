import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} from "../controllers/course.controller";
import {
  requireAuthentication,
  requireAuthorization,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  createCourse
);

router.get("/", requireAuthentication, getAllCourses);

router.get("/:id", requireAuthentication, getCourseById);

router.put(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  updateCourseById
);

router.delete(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  deleteCourseById
);

export default router;
