import bp from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDatabase from "./config/db.js";
import { errorHandler, notFound } from "./middleware.js";
import categoryRoute from "./routes/categoryRoute.js";
import commentRoute from "./routes/commentRoute.js";
import districtRouter from "./routes/districtRoute.js";
import officeRoute from "./routes/officeRoute.js";
import pollRoute from "./routes/pollRoute.js";
import postRoute from "./routes/postRoute.js";
import provinceRouter from "./routes/provinceRoutes.js";
import userRouter from "./routes/userRoute.js";

config();
connectDatabase();

const app = express();
app.use(
  bp.urlencoded({
    extended: true,
  })
);
app.use(bp.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());
app.use(fileUpload());
app.use("/uploads", express.static("uploads"));
app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    sampleFile = req.files.file;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const fileName = Date.now().toString() + sampleFile.name;
    uploadPath = path.join(__dirname, "..", "/uploads/") + fileName;

    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      res.json({
        message: "File uploaded!",
        path: "/uploads/" + fileName,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

app.use("/api/v1/province", provinceRouter);
app.use("/api/v1/district", districtRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/poll", pollRoute);
app.use("/api/v1/office", officeRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/category", categoryRoute);

app.use(notFound);
app.use(errorHandler);

export default app;
