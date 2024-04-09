import mongoose from "mongoose";

const preferenceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  choice: { type: String, required: true, default: "" },
});

export const Preference = mongoose.model("Preference", preferenceSchema);
