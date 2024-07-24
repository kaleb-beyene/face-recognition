import { Request, Response } from "express";
import Venue, { IVenueModel } from "../models/venue.model";
import User from "../models/user.model";
import Faculty from "../models/faculty.model";

// Create a new venue
export const createVenue = async (req: any, res: Response): Promise<void> => {
  try {
    const { location, facultyId } = req.body;

    const { _id } = req.user;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    const newVenue: IVenueModel = new Venue({
      location,
      facultyId: faculty._id,
      createdBy: _id,
    });

    const venue = await newVenue.save();

    res.status(201).json(venue);
  } catch (error) {
    console.error("Error creating venue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all venues
export const getAllVenues = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const venues = await Venue.find().populate(
      "facultyId createdBy",
      "name firstName lastName phoneNumber email"
    );

    res.json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get venue by ID
export const getVenueById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const venue = await Venue.findById(id).populate(
      "facultyId createdBy",
      "name firstName lastName phoneNumber email"
    );

    if (!venue) {
      res.status(404).json({ error: "Venue not found" });
      return;
    }

    res.json(venue);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update venue by ID
export const updateVenueById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    // const { location, facultyId } = req.body;
    const { location } = req.body;

    // const faculty = await Faculty.findById(facultyId);
    // if (!faculty) {
    //   res.status(404).json({ error: "Faculty not found" });
    //   return;
    // }

    const updatedVenue = await Venue.findByIdAndUpdate(
      id,
      //   { location, facultyId: faculty._id },
      { location },
      { new: true }
    ).populate(
      "facultyId createdBy",
      "name firstName lastName email phoneNumber"
    );

    if (!updatedVenue) {
      res.status(404).json({ error: "Venue not found" });
      return;
    }

    res.json(updatedVenue);
  } catch (error) {
    console.error("Error updating venue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete venue by ID
export const deleteVenueById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedVenue = await Venue.findByIdAndDelete(id);

    if (!deletedVenue) {
      res.status(404).json({ error: "Venue not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting venue:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
