import mongoose from  "mongoose";


const reelSchema = new mongoose.Schema({
  title: String,
  file: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // default: [],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
})

const Reel = mongoose.models.Reel || mongoose.model("Reel", reelSchema)

export default Reel
