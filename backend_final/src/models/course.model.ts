import { Document, Schema, model, Model, Types } from "mongoose";
import Faculty, { IFacultyModel } from "./faculty.model";
import User, { IUserModel } from "./user.model";

interface ICourse {
  name: string;
  faculty: Types.ObjectId | IFacultyModel;
  createdBy: Types.ObjectId | IUserModel;
}

export interface ICourseModel extends ICourse, Document {}

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
  },
  { timestamps: true }
);

const Course: Model<ICourseModel> = model<ICourseModel>("Course", courseSchema);

export default Course;
