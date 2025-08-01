import ConnectDB from "@/lib/ConnectDb";
import { UserI } from "@/types/UserType";
import { Model, model, models, Schema, Types } from "mongoose";

// await ConnectDB()
const UserSchema = new Schema<UserI>({
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
      type: Types.ObjectId,
      ref: "Post"
    },
  ],
  saved: [
    {
      type: Types.ObjectId,
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

const User = models.User || model<UserI>("User", UserSchema);
export default User as Model<UserI>;
