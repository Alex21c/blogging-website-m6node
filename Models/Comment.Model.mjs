import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comments", CommentSchema);
export default CommentModel;
