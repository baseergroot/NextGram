import { model, models, Schema, Types } from  "mongoose";

const postSchema = new Schema({
  title: String,
  file: String,
  createdBy: { type: Types.ObjectId, ref: "User", required: true },
  likes: [{ type: Types.ObjectId, ref: "User" }],
  comments: [{ type: Types.ObjectId, ref: Comment }],
  saved: [{ type: Types.ObjectId, ref: "User" }],
})

const Post = models.Post || model("Post", postSchema)

export default Post
