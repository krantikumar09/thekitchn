import express from "express";
import multer from "multer";
import {
  addFood,
  getFoodList,
  removeFood,
} from "../controllers/foodController.js";

const foodRoute = express.Router();

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRoute.post("/add", upload.single("image"), addFood);
foodRoute.get("/list", getFoodList);
foodRoute.post("/remove", removeFood);

export default foodRoute;
