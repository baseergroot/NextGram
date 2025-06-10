import mongoose, { model, models, Schema } from "mongoose"


const UserSchema = new Schema(
  {
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String
  },
  password: {
    type: String,
    min: [6, "password must be atleast 6 character"],
    required: true,
  },
  profilePic: {
    type: String
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
    }
  ],
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel"
    }
  ],
  followers: [{ type: String}],
  followedByCurrentUser: {
    type: Boolean,
    default: false
  },
  followings: [{ type: String, default: [] }],
}
)

const User = models.User || model("User", UserSchema)
export default User