// index.mjs
import express from "express";
import dotenv from "dotenv";
import gradesRouter from "./routes/grades.mjs";
import "./db/mongoose.js";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Add home route
app.get("/", (req, res) => {
  res.send("✅ Grades API is running!");
});

// Grades routes
app.use("/grades", gradesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
