import mongoose, { model, models, Types } from "mongoose";

const commentSchema = new mongoose.Schema({
  createdBy: {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  post: {
    type: Types.ObjectId,
    ref: "Post",
    required: true
  },
  likes: [{
    type: Types.ObjectId,
    ref: "User",
    default: [],
  }],
  dislikes: [{
    type: Types.ObjectId,
    ref: "User",
    default: [],
  }]
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
