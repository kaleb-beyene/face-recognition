import express from "express";
import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSessionById,
  deleteSessionById,
  flattenSessions,
  getSessionByStudent,
} from "../controllers/session.controller";
import {
  requireAuthentication,
  requireAuthorization,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post("/hello", requireAuthentication, getSessionByStudent);

router.get("/sessions", requireAuthentication, flattenSessions);

router.post(
  "/",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  createSession
);

router.get("/", requireAuthentication, getAllSessions);

router.get("/:id", requireAuthentication, getSessionById);

router.put(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  updateSessionById
);

router.delete(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  deleteSessionById
);

export default router;
