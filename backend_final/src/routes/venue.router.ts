import express from "express";
import {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenueById,
  deleteVenueById,
} from "../controllers/venue.controller";
import {
  requireAuthentication,
  requireAuthorization,
} from "../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  createVenue
);

router.get("/", requireAuthentication, getAllVenues);

router.get("/:id", requireAuthentication, getVenueById);

router.put(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  updateVenueById
);

router.delete(
  "/:id",
  requireAuthentication,
  requireAuthorization("faculty", "staff"),
  deleteVenueById
);

export default router;
