import { Request, Response } from "express";
import mongoose from "mongoose";
import Session, { ISessionModel } from "../models/session.model";
import Venue from "../models/venue.model";
import Course from "../models/course.model";
import Faculty from "../models/faculty.model";
import Lecture from "../models/lecture.model";
import Student from "../models/student.model";
import * as studentService from "../service/student.service";
import * as sessionService from "../service/session.service";

export const createSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      venueId,
      startTime,
      endTime,
      daysInAWeek,
      totalHour,
      lectureId,
      courseId,
      facultyId,
      studentIds,
    } = req.body;

    // Validate the presence of Venue, Lecture, Course, and Faculty
    const venue = await Venue.findById(venueId);
    if (!venue) {
      res.status(404).json({ error: "Venue not found" });
      return;
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      res.status(404).json({ error: "Lecture not found" });
      return;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    // Iterate through the studentIds and create a new session for each student
    const sessions = await Promise.all(
      studentIds.map(async (student) => {
        const studentData = await Student.findById(student);
        if (!studentData) {
          return { error: `Student with ID ${student} not found` };
        }

        const newSession: ISessionModel = new Session({
          venueId,
          startTime,
          endTime,
          daysInAWeek,
          totalHour,
          lectureId,
          courseId,
          facultyId,
          student: student,
        });

        console.log(newSession, "newSession");

        return await newSession.save();
      })
    );

    res.status(201).json(sessions);
  } catch (error) {
    console.error("Error creating sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all sessions
export const getAllSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessions = await Session.find()
      .populate("venueId", "location")
      .populate("lectureId", "name")
      .populate("courseId", "name")
      .populate("facultyId", "name")
      .populate("student", "name email");

    res.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSessionByStudent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name } = req.body;

  try {
    const student: any = await studentService.getStudentByName(name);

    await Session.findOneAndUpdate(
      { student: student._id },
      {
        status: "present",
      },
      { new: true }
    );

    const getAllSessions = await sessionService.getAllSessions();

    res.status(200).json(getAllSessions);
  } catch (error) {
    res.status(error.status).json({ message: "Internal Error" });
  }
};

// Get session by ID
export const getSessionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("venueId", "location")
      .populate("lectureId", "name")
      .populate("courseId", "name")
      .populate("facultyId", "name")
      .populate("student", "name email");

    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update session by ID
export const updateSessionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      venueId,
      startTime,
      endTime,
      daysInAWeek,
      totalHour,
      lectureId,
      courseId,
      facultyId,
      studentIds,
    } = req.body;

    const venue = await Venue.findById(venueId);
    if (!venue) {
      res.status(404).json({ error: "Venue not found" });
      return;
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      res.status(404).json({ error: "Lecture not found" });
      return;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      res.status(404).json({ error: "Faculty not found" });
      return;
    }

    // Check if all students exist
    const students = await Student.find({ _id: { $in: studentIds } });
    if (students.length !== studentIds.length) {
      res.status(404).json({ error: "One or more students not found" });
      return;
    }

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      {
        venueId,
        startTime,
        endTime,
        daysInAWeek,
        totalHour,
        lectureId,
        courseId,
        facultyId,
        student: studentIds,
      },
      { new: true }
    )
      .populate("venueId", "location")
      .populate("lectureId", "name")
      .populate("courseId", "name")
      .populate("facultyId", "name")
      .populate("student", "name email");

    if (!updatedSession) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.json(updatedSession);
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStudentStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if all students exist

    const updatedSession = await Session.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true }
    )
      .populate("venueId", "location")
      .populate("lectureId", "name")
      .populate("courseId", "name")
      .populate("facultyId", "name")
      .populate("student", "name email");

    if (!updatedSession) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.json(updatedSession);
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete session by ID
export const deleteSessionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedSession = await Session.findByIdAndDelete(id);

    if (!deletedSession) {
      res.status(404).json({ error: "Session not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const flattenSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessions = await Session.find()
      .populate("venueId", "location")
      .populate("lectureId", "name")
      .populate("courseId", "name")
      .populate("facultyId", "name")
      .populate("student", "name email");

    const flattenedSessions = sessions.flatMap((session: any) =>
      session.students.map((student: any) => ({
        _id: session._id,
        venueId: session.venueId._id,
        location: session.venueId.location,
        startTime: session.startTime,
        endTime: session.endTime,
        daysInAWeek: session.daysInAWeek,
        totalHour: session.totalHour,
        lectureId: session.lectureId._id,
        lectureName: session.lectureId.name,
        courseId: session.courseId._id,
        courseName: session.courseId.name,
        facultyId: session.facultyId._id,
        facultyName: session.facultyId.name,
        studentId: student._id,
        studentName: student.name,
        studentEmail: student.email,
      }))
    );

    res.json(flattenedSessions);
  } catch (error) {
    console.error("Error fetching flattened sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
