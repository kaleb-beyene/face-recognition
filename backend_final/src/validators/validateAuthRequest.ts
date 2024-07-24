import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { UserModel } from "../models";

// TODO: Modify once the user model has been updated
const validateSignup = [
  // check("phoneNumber")
  //   .notEmpty()
  //   .withMessage("Phone number is required")
  //   .isLength({ max: 20 })
  //   .withMessage("Phone number cannot exceed 10 characters")
  //   .custom(async (value) => {
  //     const user = await UserModel.findOne({ phoneNumber: value });
  //     if (user) {
  //       throw new Error("Phone number already exists");
  //     }
  //     return true;
  //   }),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    }),
  // check("password")
  //   .notEmpty()
  //   .withMessage("Password is required")
  //   .isLength({ min: 8 })
  //   .withMessage("Password must be at least 8 characters")
  //   .matches(/\d/)
  //   .withMessage("Password must contain a number")
  //   .matches(/[a-zA-Z]/)
  //   .withMessage("Password must contain a letter"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).json({ success: false, errors: errors.array() });
    }
    return next();
  },
];

export { validateSignup };
