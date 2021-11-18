"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const multer_1 = __importDefault(require("multer"));
const apiController_1 = require("./controllers/apiController");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
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
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
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
router.use(express_1.default.urlencoded({ extended: true }));
router.use(express_1.default.json());
router.post("https://young-oasis-68738.herokuapp.com/upload", upload.array("data", 2), apiController_1.uploadFile);
exports.default = router;
