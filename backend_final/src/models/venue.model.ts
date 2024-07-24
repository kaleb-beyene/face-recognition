import { Document, Schema, model, Model, Types } from "mongoose";
import User, { IUserModel } from "./user.model";
import Faculty, { IFacultyModel } from "./faculty.model";

interface IVenue {
  location: string;
  createdBy: Types.ObjectId | IUserModel;
  facultyId: Types.ObjectId | IFacultyModel;
}

export interface IVenueModel extends IVenue, Document {}

const venueSchema = new Schema<IVenue>(
  {
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required"],
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "Faculty",
      required: [true, "Faculty ID is required"],
    },
  },
  { timestamps: true }
);

const Venue: Model<IVenueModel> = model<IVenueModel>("Venue", venueSchema);

export default Venue;
