import { Request, Response } from "express";
import fs from "fs";
import sharp from "sharp";
import dotenv from "dotenv";
dotenv.config();

import { IFile  } from "../interfaces";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
  updateMetadata,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

// Initialization
initializeApp(firebaseConfig);
const storage = getStorage();

declare module "express-serve-static-core" {
  interface Request {
    files?: IFile[];
  }
}

// Updating media metadata
const updateFile = async (mimeType: string, dataRef: any) => {
  try {
    const metadata = {
      contentType: mimeType,
    };
    await updateMetadata(dataRef, metadata);
  } catch (error) {
    console.error("Update failed", error);
  }
};

// Getting media url
const getUrl = async (dataRef: any) => {
  try {
    const url = await getDownloadURL(dataRef);
    return url;

  } catch (error: any) {
    switch (error.code) {
      case "storage/object-not-found":
        // File doesn't exist
        break;
      case "storage/unauthorized":
        // User doesn't have permission to access the object
        break;
      case "storage/canceled":
        // User canceled the upload
        break;
      case "storage/unknown":
        // Unknown error occurred, inspect the server response
        break;
    }
  }
};

// Uploading file to Firebase Storage
export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (req.files) {
      const files = req.files;
      for (let i in files) {
        const file = files[i];
        let dataRef = ref(storage, `audios/${file.filename}`);

        if (file.mimetype.includes("video/")) {
          dataRef = ref(storage, `videos/${file.filename}`);
        }
        if (file.mimetype.includes("image/")) {
          const info = await sharp(file.path)
            .resize(400)
            .toFormat("jpeg")
            .toFile(`./media/${file.filename}.jpeg`);

          file.destination = "./media";
          file.filename = `${file.filename}.jpeg`;
          file.path = `media/${file.filename}`;
          file.size = info.size;
          dataRef = ref(storage, `images/${file.filename}`);
        }

        let buff = fs.readFileSync(file.path);
        let base64data = buff.toString("base64");

        await uploadString(dataRef, base64data, "base64");

        updateFile(file.mimetype, dataRef);
        const url = await getUrl(dataRef);

        const obj = [{
          name: `${file.filename}`,
          url,
        }, {
          type: `${file.mimetype}`
        }];

        console.log("upload succesfull");
        res.json(obj);
      }
    }
  } catch (error) {
    console.error("Upload failed", error);
    res.json(error);
  }
};
