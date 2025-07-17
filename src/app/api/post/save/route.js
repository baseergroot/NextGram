import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {postId} = await req.json()
  console.log("postid:", postId)

  const decode = await loggedInUser()

  const user = await User.findById(decode.id)

  if (user.saved.includes(postId)) {
    console.log("already saved")
    const savedPost = await User.findByIdAndUpdate(decode.id,
      {$pull: {saved: postId}},
      {new: true})
    const savedBy  = await Post.findByIdAndUpdate(postId,
      {$pull: {saved: decode.id}},
      {new: true})
    return NextResponse.json({savedByLength: savedBy.saved.length})
  }
  else{
    console.log("not saved")
    const savedPost = await User.findByIdAndUpdate(decode.id,
      {$push: {saved: postId}},
      {new: true})
    const savedBy  = await Post.findByIdAndUpdate(postId,
      {$push: {saved: decode.id}},
      {new: true})
    return NextResponse.json({savedByLength: savedBy.saved.length})
  }
}

// Done. Shifted to server action