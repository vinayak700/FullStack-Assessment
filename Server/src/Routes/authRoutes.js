import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";
import sendEmail from "../../config/mail.js";

const authRouter = express.Router();

/* Route to handle user signup */
authRouter.post("/signup", async (req, res, next) => {
  const { name, username, email, password } = req.body;

  // Generate salt and hash password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: passwordHash,
    });
    await newUser.save();

    // Sending thank you email to the new user
    try {
      await sendEmail(newUser.email);
    } catch (error) {
      console.log(error.message);
    }

    res.status(201).json(newUser);
  } catch (error) {
    // Check for duplicate email error
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      next(error);
    }
  }
});

/* Route to handle user signin */
authRouter.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    // Remove password from user object
    delete user.password;
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
});

export default authRouter;
