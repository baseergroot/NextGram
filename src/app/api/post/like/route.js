import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
import Post from "@/models/PostModel"
import { NextResponse } from "next/server"

export async function POST(req) {
  const {postId} = await req.json()
  console.log(postId)
  const decode = await loggedInUser()
  // console.log("loggedindata", decode)
  await ConnectDB()
  const post = await Post.findById(postId)
  if (post.likes.includes(decode.id)) {
    console.log("already Liked")
    const updatedPost = await Post.findByIdAndUpdate(postId, {$pull: {likes: decode.id}}, { new: true })
    return NextResponse.json({ok: true, message: "unliked", updatedPost})
  }
  console.log("not liked yet")
  const updatedPost = await Post.findByIdAndUpdate(postId, {$push: {likes: decode.id}}, { new: true })
  return NextResponse.json({ok: true, message: "liked", updatedPost})
}
