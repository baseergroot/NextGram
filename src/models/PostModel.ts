import mongoose from  "mongoose";
import User from "./UserModel";
import Comment from "./CommentModel";

let Post = mongoose.models.Post
const postSchema = new mongoose.Schema({
  title: String,
  file: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: Comment }],
  saved: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
})

Post = Post || mongoose.model("Post", postSchema)

export default Post
