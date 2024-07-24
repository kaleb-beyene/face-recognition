import { Request, Response } from "express";
import Course, { ICourseModel } from "../models/course.model";
import User from "../models/user.model";
import Faculty from "../models/faculty.model";

// Create a new course
export const createCourse = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, facultyId }: any = req.body;

    const { _id } = req.user;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    const newCourse: ICourseModel = new Course({
      name,
      faculty: faculty._id,
      createdBy: _id,
    });

    const course = await newCourse.save();

    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all courses
export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Course.find().populate(
      "faculty createdBy",
      "name firstName lastName"
    );

    // Respond with the fetched courses
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get course by ID
export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Fetch the course by ID from the database
    const course = await Course.findById(id).populate(
      "faculty createdBy",
      "name firstName lastName"
    );

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    // Respond with the fetched course
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update course by ID
export const updateCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    // const { name, facultyId } = req.body;
    const { name } = req.body;

    // Validate the faculty ID
    // const faculty = await Course.findById(facultyId);
    // if (!faculty) {
    //   res.status(404).json({ error: "Faculty not found" });
    //   return;
    // }

    // Find the course by ID and update it in the database
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    ).populate("faculty createdBy", "name firstName lastName");

    if (!updatedCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    // Respond with the updated course
    res.json(updatedCourse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete course by ID
export const deleteCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Delete the course by ID from the database
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    // Respond with success message
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
