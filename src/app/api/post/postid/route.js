import ConnectDB from "@/lib/ConnectDb"
import Post from "@/models/PostModel"
import User from "@/models/UserModel"
import { Types } from "mongoose"
import { NextResponse } from "next/server"
import Comment from "@/models/CommentModel"

export async function POST(req) {
  const {postid} = await req.json()
  // const postid = "oiuwoiu2wjdiuqwiuihqhekkjewqkj"
  console.log(postid, postid.length)

  if (!Types.ObjectId.isValid(postid)) {
    console.log("eror")
    return NextResponse.json({msg: "invalid"})
  }

  await ConnectDB()
  const post = await Post.findById(postid)
  .populate("createdBy", "name username profilePic")
  .populate({
    path: "comments",
    select: "_id post content createdBy likes",
    populate: {
      path: "createdBy",
      select: "name username profilePic"
    }
  })
  // console.log(post.comments[0])

  if (!post) {
    console.log("post didnot exist")
    return NextResponse.json({OK: false, message: "post didnot exist"})
  }

  return NextResponse.json({ok: true, post})
}

// Done. Shifted to server action