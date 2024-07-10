import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const randomString = crypto.randomBytes(16).toString("hex");
    const fileExtension = path.extname(file.originalname);
    const randomFileName = `${randomString}${fileExtension}`;
    cb(null, randomFileName);
  },
});

export const upload = multer({ storage });
