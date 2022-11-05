import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  province: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "provinces",
  },
  district: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "districts",
  },
  polls: {
    type: [
      {
        pollId: {
          type: mongoose.Schema.ObjectId,
          ref: "polls",
        },
        opIndex: {
          type: Number,
        },
      },
    ],
    default: [],
  },
  profileImag: {
    type: String,
  },
});

export default model("users", userSchema);
