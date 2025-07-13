"use server"
import ConnectDB from "@/lib/ConnectDb"
import Post from "@/models/PostModel"
import User from "@/models/UserModel"
import { Types } from "mongoose"
import Comment from "@/models/CommentModel"

await ConnectDB()
export async function PostParam(postid) {
  console.log(postid, postid.length)

  if (!Types.ObjectId.isValid(postid)) {
    console.log("error")
    return {msg: "invalid", success: false}
  }

  
  const post = await (Post as any).findById(postid)
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
    return {success: false, message: "post didnot exist"}
  }

  return {success: true, post}
}
