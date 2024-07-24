import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import swaggerUI from "swagger-ui-express";

import * as routev1 from "./routes";
import path from "path";
// import errorHandlerMiddleware from "./middleware/error.middleware";
// import swaggerSpec from "./config/swagger.config";
import corsOptions from "./config/cors.config";

dotenv.config();

const app: Application = express();

// Logger configuration
app.use(morgan("dev"));

// Server configuration
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Documentation endpoint
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Let these to middleware stay here
app.use(express.json());
app.use(bodyParser.json());

// Resource endpoints
app.use("/api/v1", routev1.userRoute);
app.use("/api/v1/faculty", routev1.facultyRoute);
app.use("/api/v1/course", routev1.courseRoute);
app.use("/api/v1/venue", routev1.venueRoute);
app.use("/api/v1/session", routev1.sessionRoute);
app.use("/api/v1/student", routev1.studentRoute);
app.use("/api/v1/lecture", routev1.lectureRoute);
app.use("/api/v1/separate", routev1.separeteRoute);

// Error Handling Middleware
// app.use(errorHandlerMiddleware);

// Serve static files from uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

export default app;
