import express, { json } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { notFound, errorHandler } from "./middleware.js";
import connectDatabase from "./config/db.js";
import bp from 'body-parser'

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

app.get("/", (req, res) => {
   res.json({
      message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
   });
});


import provinceRouter from "./routes/provinceRoutes.js";
import districtRouter from "./routes/districtRoute.js";
import userRouter from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import pollRoute from "./routes/pollRoute.js";
app.use("/api/v1/province", provinceRouter);
app.use("/api/v1/district", districtRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/poll", pollRoute);




app.use(notFound);
app.use(errorHandler);

export default app;
