import { config } from "dotenv";
import mongoose from "mongoose";
config();

const connectDatabase = () => {
   // connect(process.env.MONGODB_URI, {
   //    useNewUrlParser: true,
   //    useUnifiedTopology: true,
   //    serverSelectionTimeoutMS: 5000,
   // }).then(() => {
   //    console.log("Connected to DB 💫");
   // });


   mongoose
   .connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   })
   .then(() => {
     console.log("Connected to the database 💫");
   })
   .catch((err) => {
     console.error(`Error connecting to the database . n${err}`);
   });
};
export default connectDatabase;
