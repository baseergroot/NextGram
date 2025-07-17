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
      "https://res.cloudinary.com/dyay3p5th/image/upload/v1749750096/rt9qjllvlinzkffpsbpr.png",
  },
  bio: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    },
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
    
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
