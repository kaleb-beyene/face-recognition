import { Document, Schema, model, Model, Types } from "mongoose";
import { isValidEmail, validatePassword } from "../validators/user.validator";

interface IUser {
  firstName: string;
  lastName: string;
  role: Types.ObjectId | Record<string, unknown>;
  email: string;
  password: string;
  profileImg?: string;
  phoneNumber?: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: (value: string) => isValidEmail(value),
        message: "Invalid email address",
      },
    },
    password: {
      type: String,
      validate: {
        validator: (value: string) => validatePassword(value),
        message:
          "Password must have at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character.",
      },
      // select: false,
    },
    profileImg: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const User: Model<IUserModel> = model<IUserModel>("User", userSchema);

export default User;
