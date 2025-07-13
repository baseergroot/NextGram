import mongoose from  "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  file: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post
