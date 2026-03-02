"use server"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/helpers/getLoggedInUser"
import Post from "@/models/PostModel"
import { IPost, PostI } from "@/types/PostType"
import { ObjectId, Types } from "mongoose"
import { LikeActionResponseI } from "@/types/likePostResponse"


export async function LikeAction(initilaState: any, postId: string):
  Promise<LikeActionResponseI> {
  // console.log("postid:", postId)
  const decode = await loggedInUser()

  await ConnectDB()
  const post = await (Post as any).findById(postId)
  if (post.likes.includes(decode.id)) {
    console.log("already Liked")
    const updatedPost: PostI = await (Post as any).findByIdAndUpdate(postId, { $pull: { likes: decode.id } }, { new: true })

    return {
      success: true,
      message: "unliked",
      updatedPost: {
        _id: updatedPost._id.toString(),
        likes: updatedPost.likes.map(
          (like: object) => {
            // console.log("tyoes if like id", typeof like)
            return like.toString()
          }
        )
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

