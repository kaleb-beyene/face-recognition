import app from "./app";
import http from "http";
import { connectToDatabase } from "./db";
import config from "./config/config";

const PORT = config.port || 3001;

connectToDatabase();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
