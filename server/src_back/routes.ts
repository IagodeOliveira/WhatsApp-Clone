import express, { Router } from "express";
import multer from "multer";
import {
  // addNewChat,
  // addUser,
  // sendFiles,
  //sendFiles2,
  // getFiles,
  //getFiles2,
  //getUsers,
  //onChatList,
  uploadFile,
} from "./controllers/apiController";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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
  filename: (req, file, cb) => {
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
  fileFilter: (req, file, cb) => {
    // if(file.mimetype.includes('image/')) {
    const allowed = [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "audio/mpeg",
      "video/mp4",
    ];
    cb(null, allowed.includes(file.mimetype));
    // }
  },
});

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//router.post("/addChat", addNewChat);
// router.post("/addUser", addUser);
// router.post("/send", sendFiles);
//router.post("/send2", sendFiles2);
// router.post("/get", getFiles);
//router.post("/get2", getFiles2);
//router.post("/getUsers", getUsers);
//router.post("/onChat", onChatList);
router.post("/upload", upload.array("data", 2), uploadFile);

export default router;
