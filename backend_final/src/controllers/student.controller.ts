import { Request, Response } from "express";
import Student, { IStudentModel } from "../models/student.model";
import Faculty from "../models/faculty.model";
import path from "path";

// Create a new student
export const createStudent = async (req: any, res: Response): Promise<void> => {
  try {
    const { name, email, phoneNumber, facultyId } = req.body;
    const profileImg = req.file ? req.file.filename : "";

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    const newStudent: IStudentModel = new Student({
      name,
      email,
      phoneNumber,
      facultyId,
      profileImg,
    });

    const student = await newStudent.save();

    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all students
export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const students = await Student.find().populate("facultyId", "name");
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get student by ID
export const getStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate("facultyId", "name");
    if (!student) {
      res.status(404).json({ error: "Student not found" });
      return;
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update student by ID
export const updateStudentById = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, facultyId } = req.body;
    const profileImg = req.file ? req.file.filename : req.body.profileImg;

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, facultyId, profileImg },
      { new: true }
    ).populate("facultyId", "name");

    if (!updatedStudent) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete student by ID
export const deleteStudentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      res.status(404).json({ error: "Student not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
