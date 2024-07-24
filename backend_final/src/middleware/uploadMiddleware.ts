import multer from "multer";
import { Request } from "express";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req: Request, file, cb) {
    const studentId = req.params.id || req.body.email;
    const facultyId = req.body.facultyId;
    cb(
      null,
      `${studentId}-${facultyId}-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage });

export default upload;
