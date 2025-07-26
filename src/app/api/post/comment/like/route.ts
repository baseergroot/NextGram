import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import Comment from "@/models/CommentModel";
import Post from "@/models/PostModel";
import { CommentI } from "@/types/CommentType";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const {commentId} = await request.json()
  // console.log(commentId)
  // const decode:Decode = await loggedInUser()
  // await ConnectDB()
  // let comment:CommentI = await (Comment as any).findById(commentId)
  // // console.log(comment.content)
  // if (comment.likes.includes(decode.id)) {
  //   comment = await (Comment as any).findByIdAndUpdate(commentId, {$pull: {likes: decode.id}}, {new: true})
  //   console.log("unlike:", comment.likes.length)
  //   return  NextResponse.json(comment)
  // }
  // comment = await (Comment as any).findByIdAndUpdate(commentId, {$push: {likes: decode.id}}, {new: true})
  // // const comments = await (Post as any).findById(comment.post)
  // console.log("like:", comment.likes.length)
  return  NextResponse.json("comment")
}

// Done. Shifted to server action