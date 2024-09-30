const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Image = require("./model/index");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.BACKEND_PORT || 3000;
console.log("Port", PORT);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  const imageUrl = `uploads/${req.file.filename}`;
  const newImage = Image({
    imageUrl: imageUrl,
  });
  await newImage.save();
  res.status(201).json({ message: "file uploaded successfully", imageUrl });
});

app.get("/all/images", async (req, res) => {
  try {
    const response = await Image.find();
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.use("/uploads", express.static("uploads"));

app.get("/test", (req, res) => {
  res.send({ name: "shahbaz" });
});

app.listen(PORT, () => {
  console.log("server started at port :", PORT);
});
