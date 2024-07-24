import { Request, Response } from "express";
import Lecture, { ILectureModel } from "../models/lecture.model";
import Faculty from "../models/faculty.model";
import Course, { ICourseModel } from "../models/course.model";

// Create a new lecture
export const createLecture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phoneNumber, courseId } = req.body;

    const course: ICourseModel = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const newLecture: ILectureModel = new Lecture({
      name,
      email,
      phoneNumber,
      facultyId: course?.faculty,
      courseId,
    });

    const lecture = await newLecture.save();

    res.status(201).json(lecture);
  } catch (error) {
    console.error("Error creating lecture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all lectures
export const getAllLectures = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lectures = await Lecture.find()
      .populate("facultyId", "name")
      .populate("courseId", "name");
    res.json(lectures);
  } catch (error) {
    console.error("Error fetching lectures:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get lecture by ID
export const getLectureById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const lecture = await Lecture.findById(id)
      .populate("facultyId", "name")
      .populate("courseId", "name");
    if (!lecture) {
      res.status(404).json({ error: "Lecture not found" });
      return;
    }
    res.json(lecture);
  } catch (error) {
    console.error("Error fetching lecture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update lecture by ID
export const updateLectureById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, facultyId, courseId } = req.body;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const updatedLecture = await Lecture.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, facultyId, courseId },
      { new: true }
    )
      .populate("facultyId", "name")
      .populate("courseId", "name");

    if (!updatedLecture) {
      res.status(404).json({ error: "Lecture not found" });
      return;
    }

    res.json(updatedLecture);
  } catch (error) {
    console.error("Error updating lecture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete lecture by ID
export const deleteLectureById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedLecture = await Lecture.findByIdAndDelete(id);

    if (!deletedLecture) {
      res.status(404).json({ error: "Lecture not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting lecture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
