import jwt from "jsonwebtoken";
import { getUserById } from "../controllers/user.controller";

interface DecodedToken {
  userId: string;
}

export const verifyJwtToken = async (token: string): Promise<any> => {
  try {
    const decodedValue = jwt.verify(token, "12345678") as DecodedToken;

    if (decodedValue) {
      const { userId } = decodedValue;
      const user = await getUserById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    throw new Error("Error verifying token");
  }
};
