"use server"
import ConnectDB from "@/lib/ConnectDb"
import Post from "@/models/PostModel"
import { mongo, Types } from "mongoose"
import Comment from "@/models/CommentModel"
import User from "@/models/UserModel"
import { PostI } from "@/types/PostType"

await ConnectDB()
export async function PostParam(postid) {
  console.log(postid, postid.length)

  if (!Types.ObjectId.isValid(postid)) {
    console.log("error")
    return {msg: "invalid", success: false}
  }
  
  try {
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
  console.log(post)

  if (!post) {
    console.log("post didnot exist")
    return {success: false, message: "post didnot exist"}
  }

  return {success: true, post: {
    title: post.title,
    file: post.file,
    createdBy: {
      _id: post.createdBy._id.toString(),
      username: post.createdBy.username,
      name: post.createdBy.name,
      profilePic: post.createdBy.profilePic
    },
    likes: post.likes.map((id: any) => id.toString()),
    comments: 
    post.comments.map((id, name, username, profilePic) => ({
      _id: id.toString(),
      name: name,
      username: username,
      profilePic: profilePic
    })),
    saved: post.saved.map((id: any) => id.toString())
  }}
  } catch (error) {
    console.log("error is:", error.message)
    return {success: false}
  }
}

