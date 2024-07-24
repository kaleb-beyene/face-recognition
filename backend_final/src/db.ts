import mongoose, { ConnectOptions } from "mongoose";
import config from "./config/config";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoose.uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("Database Connected");
  } catch (error) {
    console.error("Error while connecting to the database -", error);
  }
};
