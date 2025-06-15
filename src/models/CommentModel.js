import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  content: String,
  post: {
    type: mongoose.Schema.Types.ObjectId, ref: "Post"
  }
})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)

export default Comment
