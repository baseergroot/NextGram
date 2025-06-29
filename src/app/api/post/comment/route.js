import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
import Comment from "@/models/CommentModel"
import Post from "@/models/PostModel"
import { NextResponse } from "next/server"


export async function POST(request) {
  const data = await request.json()
  // const data = {
  //   content: "first ever comment on this platform",
  //   postid: "6856ea43ef1294cd244b6139"
  // }
  const decode = await loggedInUser()
  if (data.content == "" || data.postid == "" || decode.id == "") {
    console.log("empty fields")
    return NextResponse.json({error: "empty field"})
  }
  console.log(data, decode.id)

  await ConnectDB()

  const comment = await Comment.create({content: data.content, createdBy: decode.id, post: data.postid})
  const post = await Post.findByIdAndUpdate(data.postid, {$push: {comments: comment._id}}, {new: true})
  .populate({
    path: "comments",
    select: "_id post content createdBy",
    populate: {
      path: "createdBy",
      select: "name username profilePic"
    }
  })

  console.log("comment:", post.comments.length)

  return NextResponse.json({ok: true, post})
}
