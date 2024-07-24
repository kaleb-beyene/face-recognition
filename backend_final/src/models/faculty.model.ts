import { Document, Schema, model, Model, Types } from "mongoose";
import User, { IUserModel } from "./user.model";

interface IFaculty {
  name: string;
  createdBy: any;
}

export interface IFacultyModel extends IFaculty, Document {}

const facultySchema = new Schema<IFaculty>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
  },
  { timestamps: true }
);

const Faculty: Model<IFacultyModel> = model<IFacultyModel>(
  "Faculty",
  facultySchema
);

export default Faculty;
