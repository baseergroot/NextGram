import mongoose from "mongoose";
import User from "./UserModel";
import Post from "./PostModel";

console.log("Comment schema hit")

let Comment = mongoose.models.Comment
const commentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    default: [],
  }],
  dislikes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: [],
  }]
});

Comment = Comment || mongoose.model("Comment", commentSchema);

export default Comment;
