import mongoose from "mongoose";

const workSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pictureUrl: { type: String, required: true },
});

export const Work = mongoose.model("Work", workSchema);
