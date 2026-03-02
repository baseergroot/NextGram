import ConnectDB from "@/lib/database/ConnectDb";
import redis from "@/lib/redis/client";
import Post from "@/models/PostModel";
import { IPost } from "@/types/PostType";


export default async function getposts() {
  const cachedPosts: IPost[] | null = await redis.get("posts");

  if (cachedPosts) {
    console.log("cached data server")
    return cachedPosts
  }

  console.log("no cached data found")

  await ConnectDB()

  let postsDoc = await Post.find().populate("createdBy", "name username profilePic")

  const posts: IPost[] = postsDoc.map((post) => ({
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
  })).reverse()

  // (e.g., 60 seconds)
  await redis.set("posts", posts)

  return posts
}