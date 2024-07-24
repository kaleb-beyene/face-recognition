import { Document, Schema, model, Model, Types } from "mongoose";
import Faculty, { IFacultyModel } from "./faculty.model";
import Course, { ICourseModel } from "./course.model";

interface ILecture {
  name: string;
  email: string;
  facultyId: Types.ObjectId | IFacultyModel;
  courseId: Types.ObjectId | ICourseModel;
  phoneNumber: string;
}

export interface ILectureModel extends ILecture, Document {}

const lectureSchema = new Schema<ILecture>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty ID is required"],
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { timestamps: true }
);

const Lecture: Model<ILectureModel> = model<ILectureModel>(
  "Lecture",
  lectureSchema
);

export default Lecture;
