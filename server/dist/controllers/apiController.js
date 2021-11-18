"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
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
(0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)();
// Updating media metadata
const updateFile = (mimeType, dataRef) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metadata = {
            contentType: mimeType,
        };
        yield (0, storage_1.updateMetadata)(dataRef, metadata);
    }
    catch (error) {
        console.error("Update failed", error);
    }
});
// Getting media url
const getUrl = (dataRef) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = yield (0, storage_1.getDownloadURL)(dataRef);
        return url;
    }
    catch (error) {
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
});
// Uploading file to Firebase Storage
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.files) {
            const files = req.files;
            for (let i in files) {
                const file = files[i];
                let dataRef = (0, storage_1.ref)(storage, `audios/${file.filename}`);
                if (file.mimetype.includes("video/")) {
                    dataRef = (0, storage_1.ref)(storage, `videos/${file.filename}`);
                }
                if (file.mimetype.includes("image/")) {
                    const info = yield (0, sharp_1.default)(file.path)
                        .resize(400)
                        .toFormat("jpeg")
                        .toFile(`./media/${file.filename}.jpeg`);
                    file.destination = "./media";
                    file.filename = `${file.filename}.jpeg`;
                    file.path = `media\\${file.filename}`;
                    file.size = info.size;
                    dataRef = (0, storage_1.ref)(storage, `images/${file.filename}`);
                }
                let buff = fs_1.default.readFileSync(file.path);
                let base64data = buff.toString("base64");
                yield (0, storage_1.uploadString)(dataRef, base64data, "base64");
                updateFile(file.mimetype, dataRef);
                const url = yield getUrl(dataRef);
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
    }
    catch (error) {
        console.error("Upload failed", error);
        res.json(error);
    }
});
exports.uploadFile = uploadFile;
