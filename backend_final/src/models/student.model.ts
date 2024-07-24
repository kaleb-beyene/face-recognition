import { Document, Schema, model, Model, Types } from "mongoose";
import Faculty, { IFacultyModel } from "./faculty.model";

interface IStudent {
  name: string;
  email: string;
  phoneNumber?: string;
  facultyId: Types.ObjectId | IFacultyModel;
  profileImg: string;
}

export interface IStudentModel extends IStudent, Document {}

const studentSchema = new Schema<IStudent>(
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
    phoneNumber: {
      type: String,
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty ID is required"],
    },
    profileImg: {
      type: String,
    },
  },
  { timestamps: true }
);

const Student: Model<IStudentModel> = model<IStudentModel>(
  "Student",
  studentSchema
);

export default Student;
