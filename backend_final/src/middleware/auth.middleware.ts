import { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/auth.utils";

interface CustomRequest extends Request {
  user: any;
}

export const requireAuthentication = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error(`400: Missing authorization token`);
    }

    const token = authorizationHeader.split(" ")[1];

    const user = await verifyJwtToken(token);

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requireAuthorization =
  (...allowedRoles: string[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user || !allowedRoles.includes(user.role.toLowerCase())) {
        throw new Error(`404 Forbidden`);
      }
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
