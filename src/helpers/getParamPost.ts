import ConnectDB from "@/lib/database/ConnectDb";
import redis from "@/lib/redis/client";
import Post from "@/models/PostModel";
import { ParamPostI } from "@/types/paramPostType";
import { models } from "mongoose";


export default async function getParamPost(postid: string): Promise<ParamPostI> {

  const cachePost: ParamPostI = await redis.get("post")

  if (cachePost) {
    console.log("cached page server")
    return cachePost
  }

  console.log(models);
  await ConnectDB()
  const postDoc = await Post.findById(postid).populate({ path: "createdBy", select: "name username profilePic" }).populate({
    path: "comments",
    select: "content createdBy likes",
    populate: {
      path: "createdBy",
      select: "name username profilePic"
    }
  })

  const post: ParamPostI = {
    _id: postDoc._id.toString(),
    title: postDoc.title,
    file: postDoc.file,
    comments: postDoc.comments.map((comment: any) => ({
      _id: comment._id.toString(),
      content: comment.content,
      createdBy: {
        name: comment.createdBy.name,
        username: comment.createdBy.username,
        profilePic: comment.createdBy.profilePic,
      },
      likes: comment.likes.map((id: any) => id.toString()),
    })).reverse(),
    likes: postDoc.likes.map((id: any) => id.toString()),
    saved: postDoc.saved.map((id: any) => id.toString()),
    createdBy: {
      name: postDoc.createdBy.name,
      username: postDoc.createdBy.username,
      profilePic: postDoc.createdBy.profilePic,
    },
  };

  await redis.set("post", post)



  console.log(postid)

  return post
}