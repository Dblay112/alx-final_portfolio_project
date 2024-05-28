import express from "express";
import multer from "multer";
import {
  addItem,
  listItem,
  removeItem,
} from "../controllers/itemController.js";

const itemRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

itemRouter.post("/add", upload.single("image"), addItem);
itemRouter.get("/list", listItem);
itemRouter.post("/remove", removeItem);

export default itemRouter;
