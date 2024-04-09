import express from "express";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();
import { auth } from "../Middlewares/auth.js";
import { User } from "../Models/User.js";
import { Work } from "../Models/Work.js";
import { Preference } from "../Models/Preference.js";
import { upload } from "../Middlewares/multer.js";

const userRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Route to handle user profile update
userRouter.post("/profile", auth, upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    // Upload avatar image to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(req.file?.path, {
      secure: true,
    });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // Update user profile with new photo and location
    user.previewUrl = photoUrl.secure_url || user.previewUrl;
    user.location = location || user.location;
    await user.save();
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to handle uploading new work
userRouter.post("/upload", auth, upload.single("photo"), async (req, res) => {
  try {
    const userId = req.user.id;
    // Upload work photo to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(req.file.path, {
      secure: true,
    });
    const newWork = await Work({
      userId,
      pictureUrl: photoUrl.secure_url,
    });
    await newWork.save();
    return res.status(201).json(newWork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to save user preferences
userRouter.post("/savePreference", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { choice } = req.body;

    // Save preference to the database
    const preference = new Preference({ userId, choice });
    await preference.save();

    return res.status(201).json({ message: "Preference saved successfully" });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    console.log(error);
  }
});

// Route to get user's projects
userRouter.get("/getProjects", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const allProjects = await Work.find({ userId });
    return res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;

/* Toggle Visited Controllers */

/* Route to toggle user profile visited status */
userRouter.post("/toggleProfile", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      user.isProfileVisited = !user.isProfileVisited;
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Route to toggle user purpose visited status */
userRouter.post("/togglePurpose", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      user.isPurposeVisited = !user.isPurposeVisited;
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
