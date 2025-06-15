import mongoose, { model, models, Schema, Types } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    min: [6, "password must be atleast 6 character"],
    required: true,
  },
  profilePic: {
    type: String,
    default:
      "https://asset.cloudinary.com/dyay3p5th/6b43af850633d6ef07f3883b93797f51",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [{ type: Types.ObjectId, ref: "User" }],
  followedByCurrentUser: {
    type: Boolean,
    default: false,
  },
  followings: [{ type: Types.ObjectId, ref: "User" }],
});

const User = models.User || model("User", UserSchema);
export default User;
