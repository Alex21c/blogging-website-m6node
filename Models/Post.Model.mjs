import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    keywords: { type: [String], required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("posts", PostSchema);
export default PostModel;
