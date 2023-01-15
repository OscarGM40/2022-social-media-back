import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const app = express();

/* 
app.use((req,res,next) => {
  res.header("Access-Control-Allow-Credentials",true);
  next();
}) */

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../new-lama-social-media-front/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import postsRoutes from "./routes/posts.routes.js";
import commentsRoutes from "./routes/comments.routes.js";
import likesRoutes from "./routes/likes.routes.js";
import relationshipsRoutes from "./routes/relationships.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", likesRoutes);
app.use("/api/relationships", relationshipsRoutes);

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.clear();
  console.log(`Server running on port ${process.env.PORT}`);
});
