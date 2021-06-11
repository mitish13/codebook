import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  imageFiles: [Object],
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Post", PostSchema);

export default model;
