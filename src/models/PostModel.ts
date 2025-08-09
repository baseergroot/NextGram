import ConnectDB from "@/lib/ConnectDb";
import { PostI } from "@/types/PostType";
import { Model, model, models, Schema, Types } from  "mongoose";

// await ConnectDB()
console.log("PostModel loaded");
const postSchema = new Schema<PostI>({
  title: String,
  file: String,
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  comments: [{ type: Types.ObjectId, ref: "Comment" }],
  saved: [{ type: Types.ObjectId, ref: "User" }],
})

const Post = models.Post || model<PostI>("Post", postSchema)

export default Post as Model<PostI>

