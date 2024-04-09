/* Module/File Imports */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import connection from "./config/db.js";
import userRoutes from "./src/Routes/userRoutes.js";
import authRoutes from "./src/Routes/authRoutes.js";

/* Initialize Express Application */
const app = express();

/* CONFIGURATIONS */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

/* SETTING UP LOCAL ROUTES*/
app.use(express.static("public"));

/* WELCOME PAGE */
app.get("/", (req, res) => {
  res.status(200).redirect("./welcome.html");
});

/* API ROUTES */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

/* APPLICATION ERROR HANDLERS */
// app.use(handleValidationError);
// app.use(errorHandler);

/* Listening to Server */
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  connection();
});
