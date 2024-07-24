import { Request, Response } from "express";
import Faculty, { IFacultyModel } from "../models/faculty.model";
import User, { IUserModel } from "../models/user.model";

// Create a new faculty
export const createFaculty = async (req: any, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;

    const { _id } = req.user;

    console.log(_id, "_id");

    const user: any = await User.findById(_id);
    if (!user || user.role !== "faculty") {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }

    const newFaculty: any = {
      name,
      createdBy: user._id,
    };

    const faculty = await Faculty.create(newFaculty);

    res.status(201).json(faculty);
  } catch (error) {
    console.error("Error creating faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all faculties
export const getAllFaculties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const faculties = await Faculty.find().populate(
      "createdBy",
      "firstName lastName phoneNumber email"
    );
    res.json(faculties);
  } catch (error) {
    console.error("Error fetching faculties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get faculty by ID
export const getFacultyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const faculty = await Faculty.findById(id).populate(
      "createdBy",
      "firstName lastName"
    );

    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    res.json(faculty);
  } catch (error) {
    console.error("Error fetching faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update faculty by ID
export const updateFacultyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name }: { name: string } = req.body;

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    ).populate("createdBy", "firstName lastName");

    if (!updatedFaculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    res.json(updatedFaculty);
  } catch (error) {
    console.error("Error updating faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete faculty by ID
export const deleteFacultyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
