import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUserModel } from "../models/user.model";
import config from "../config/config";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      profileImg,
      phoneNumber,
      role,
    }: IUserModel = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImg,
      phoneNumber,
      role,
    });

    await newUser.save();

    res.status(201).send();
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user._id }, "12345678");

    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImg: user.profileImg,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get current user based on JWT token
export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(" ")[1]; // Assuming token is sent in the format: Bearer <token>

    if (!token) {
      res.status(401).json({ error: "Token not provided" });
      return;
    }

    // Verify the token
    const decodedToken = jwt.verify(token, "12345678") as {
      userId: string;
    };

    // Find the user by userId from the token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Respond with user info
    res.json({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImg: user.profileImg,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (userId: string): Promise<any> => {
  try {
    const user: IUserModel = await User.findById(userId).populate("role");

    if (!user) {
      throw new Error("User Not Found");
    }
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Server Error");
  }
};
