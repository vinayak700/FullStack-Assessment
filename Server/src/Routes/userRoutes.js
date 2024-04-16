import express from "express";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();
import { auth } from "../Middlewares/auth.js";
import { User } from "../Models/User.js";
import { upload } from "../Middlewares/multer.js";
import sendEmail from "../../config/mail.js";

const userRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Route to handle user profile update
userRouter.post(
  "/sendAvatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      // Upload avatar image to Cloudinary
      const photoUrl = await cloudinary.uploader.upload(req.file?.path, {
        secure: true,
      });
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      // Update user profile with new photo
      user.previewUrl = photoUrl.secure_url || user.previewUrl;
      await user.save();
      return res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);
// Route to handle user profile update
userRouter.post("/update", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Update user location
    user.location = location || user.location;
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send a mail
userRouter.post("/send-mail", auth, async (req, res) => {
  try {
    const { email } = req.body;
    // Sending thank you email to the new user
    try {
      await sendEmail(email);
    } catch (error) {
      console.log(error.message);
    }
    return res.status(200).json("Email has been sent to you email address.");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;
