import { model, Schema } from "mongoose";

const pollSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  options: {
    type: [
      new Schema({
        name: { type: String },
        vote: { type: Number, default: 0 },
      }),
    ],
  },
  totalVote: {
    type: Number,
    default: 0,
  },
});

export default model("polls", pollSchema);
