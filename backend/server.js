import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

//Middlewares are the core part of express
// It is basically 5 diff version

app.use(express.json());
app.use("/post", postRoutes);
app.use("/user", userRoutes);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(5000))
  .then(() => console.log("Server running on port 5000"))
  .catch((err) => console.log(err));
