"use server"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
import Post from "@/models/PostModel"
import { PostI } from "@/types/PostType"
import { Types } from "mongoose"


await ConnectDB()
export async function LikeAction(initilaState:  any, postId: string):
  Promise<{ success: boolean, message: string, updatedPost?: { _id: string, likes: string[] } }> 
  {
  // console.log("postid:", postId)
  const decode = await loggedInUser()

  const post = await (Post as any).findById(postId)
  if (post.likes.includes(decode.id)) {
    // console.log("already Liked")
    const updatedPost: PostI = await (Post as any).findByIdAndUpdate(postId, { $pull: { likes: decode.id } }, { new: true })
    return {
      success: true,
      message: "unliked",
      updatedPost: {
        _id: updatedPost._id.toString(),
        likes: updatedPost.likes.map((like: Types.ObjectId) => like.toString())
      }
    }
  }
  // console.log("not liked yet")
  const updatedPost: PostI = await (Post as any).findByIdAndUpdate(postId, { $push: { likes: decode.id } }, { new: true })
  return {
    success: true,
    message: "liked",
    updatedPost: {
      _id: updatedPost._id.toString(),
      likes: updatedPost.likes.map((like: Types.ObjectId) => like.toString())
    }
  }
}

