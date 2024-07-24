import express from "express";
import {
  createLecture,
  getAllLectures,
  getLectureById,
  updateLectureById,
  deleteLectureById,
} from "../controllers/lecture.controller";
import {
  requireAuthentication,
  requireAuthorization,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/",
  requireAuthentication,
  requireAuthorization("faculty"),
  createLecture
);

router.get("/", requireAuthentication, getAllLectures);

router.get("/:id", requireAuthentication, getLectureById);

router.put(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty"),
  updateLectureById
);

router.delete(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty"),
  deleteLectureById
);

export default router;
