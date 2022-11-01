import { connect } from "mongoose";
import { config } from "dotenv";
config();

const connectDatabase = () => {
   connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
   }).then(() => {
      console.log("Connected to DB 💫");
   });
};
export default connectDatabase;
