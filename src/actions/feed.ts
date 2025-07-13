"use server"

import ConnectDB from "@/lib/ConnectDb"
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { PostI } from "@/types/PostType";
import { UserI } from "@/types/UserType";

await ConnectDB()
export async function Feed() {

  const posts:PostI[] = await (Post as any).find().populate("createdBy", "name username profilePic")
  const decode:Decode = await loggedInUser()
  const user:UserI = await (User as any).findById(decode.id)

  if (posts) {
    console.log({ posts })
    return {
      ok: true,
      posts: posts.map(post => ({
        _id: post._id.toString(),
        title: post.title,
        file: post.file,
        createdBy: {
          id: post.createdBy._id.toString(),
          username: post.createdBy.username,
          name: post.createdBy.name,
          profilePic: post.createdBy.profilePic
        },
        likes: post.likes.map((id: any) => id.toString()),
        comments: post.comments.map((id: any) => id.toString()),
        saved: post.saved.map((id: any) => id.toString())
      })),
      profilePic: user.profilePic
    }
  }
  return { message: "no post to be shown", profilePic: user.profilePic }
}
