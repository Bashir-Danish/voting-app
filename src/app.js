import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { notFound, errorHandler } from "./middleware.js";
import connectDatabase from "./config/db.js";
import bp from 'body-parser'
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";



config();
connectDatabase()

const app = express();
app.use(bp.urlencoded({
   extended: true
}));
app.use(bp.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(json());
app.use(fileUpload());


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
     uploadPath =
       path.join(__dirname, "..", "/uploads/") +
       Date.now().toString() +
       sampleFile.name;
 
     sampleFile.mv(uploadPath, function (err) {
       if (err) return res.status(500).send(err);
       res.json({
         message: "File uploaded!",
         path: uploadPath,
       });
     });
   } catch (error) {
     console.log(error);
   }
 }
);


import provinceRouter from "./routes/provinceRoutes.js";
import districtRouter from "./routes/districtRoute.js";
import userRouter from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import pollRoute from "./routes/pollRoute.js";
import officeRoute from "./routes/officeRoute.js";
import commentRoute from "./routes/commentRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
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
