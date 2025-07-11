import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId, ref: "Post",
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId, ref: "Post",
    default: 0
  }],
dislikes:[{
  type: mongoose.Schema.Types.ObjectId, ref: "Post",
  default: 0
}]
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment
