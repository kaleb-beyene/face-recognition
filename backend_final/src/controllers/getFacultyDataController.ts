import { Request, Response } from "express";
import Student from "../models/student.model";
import Course from "../models/course.model";
import Venue from "../models/venue.model";
import Lecture from "../models/lecture.model";

export const getFacultyData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { facultyId } = req.params;

    const faculty = facultyId;

    const students = await Student.find({ facultyId });

    const courses = await Course.find({ faculty });

    const venues = await Venue.find({ facultyId });

    const lectures = await Lecture.find({ facultyId });

    res.json({ students, courses, venues, lectures });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
