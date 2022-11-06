import { config } from "dotenv";
import mongoose from "mongoose";
config();

const connectDatabase = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI ??
        "mongodb+srv://danish123:voting-app@cluster0.hbms5tk.mongodb.net/voitng-app",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Connected to the database 💫");
    })
    .catch((err) => {
      console.error(`Error connecting to the database . n${err}`);
    });
};
export default connectDatabase;
