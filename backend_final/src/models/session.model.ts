import { Document, Schema, model, Model, Types } from "mongoose";
import User, { IUserModel } from "./user.model";
import Faculty, { IFacultyModel } from "./faculty.model";
import Course, { ICourseModel } from "./course.model";
import Venue, { IVenueModel } from "./venue.model";
import Student, { IStudentModel } from "./student.model";
import { ILectureModel } from "./lecture.model";

interface ISession {
  venueId: Types.ObjectId | IVenueModel;
  startTime?: string;
  endTime?: string;
  daysInAWeek?: string[];
  totalHour?: number;
  lectureId: Types.ObjectId | ILectureModel;
  courseId: Types.ObjectId | ICourseModel;
  facultyId: Types.ObjectId | IFacultyModel;
  student: Types.ObjectId | IStudentModel;
  status: String;
}

export interface ISessionModel extends ISession, Document {}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const sessionSchema = new Schema<ISession>(
  {
    venueId: {
      type: Schema.Types.ObjectId,
      ref: "Venue",
      required: [true, "Venue ID is required"],
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    daysInAWeek: {
      type: [String],
      validate: {
        validator: function (value: string[]) {
          return value.every((day) => daysOfWeek.includes(day));
        },
        message: "Invalid days of the week",
      },
    },
    totalHour: {
      type: Number,
    },
    lectureId: {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
      required: [true, "Lecture ID is required"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty ID is required"],
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    status: {
      type: String,
      default: "absent",
    },
  },
  { timestamps: true }
);

const Session: Model<ISessionModel> = model<ISessionModel>(
  "Session",
  sessionSchema
);

export default Session;

// students: [
//   {
//     type: Schema.Types.ObjectId,
//     ref: "Student",
//   },
// ],
