import ConnectDB from "@/lib/ConnectDb";
import { CommentI } from "@/types/CommentType";
import { Model, model, models, Schema, Types } from "mongoose";

// await ConnectDB()
console.log("CommentModel loaded");
const commentSchema = new Schema<CommentI>({
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
  }]
});

const Comment = models.Comment || model<CommentI>("Comment", commentSchema);

export default Comment as Model<CommentI>;
