import express, { Router, Request } from "express";
import multer from "multer";
import {
  uploadFile,
} from "./controllers/apiController";

const router = Router();

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    if (file.mimetype.includes("audio/mpeg")) {
      cb(null, "./tmp/audiotmp");
    }
    if (file.mimetype.includes("image/")) {
      cb(null, "./tmp/imagetmp");
    }
    if (file.mimetype.includes("video/mp4")) {
      cb(null, "./tmp/videotmp");
    }
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    if (file.mimetype.includes("audio/mpeg")) {
      cb(null, file.fieldname + Date.now() + ".mp3");
    }
    if (file.mimetype.includes("image/")) {
      cb(null, file.fieldname + Date.now());
    }
    if (file.mimetype.includes("video/mp4")) {
      cb(null, file.fieldname + Date.now() + ".mp4");
    }
  },
});

const upload = multer({
  storage,
  fileFilter: (req: Request, file, cb) => {
    const allowed = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "audio/mpeg",
      "video/mp4",
    ];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.post("/upload", upload.array("data", 2), uploadFile);

export default router;
