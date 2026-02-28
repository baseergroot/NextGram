import ConnectDB from "@/lib/ConnectDb";
import redis from "@/lib/redis/client";
import Post from "@/models/PostModel";
import { IPost } from "@/types/PostType";


export default async function getposts() {
  const cachedData: IPost[] | null = await redis.get("posts");

  if (cachedData) {
    console.log("cached data server")
    return cachedData
  }

  console.log("no cached data found")

  await ConnectDB()

  let posts: IPost[] = await (Post as any).find().populate("createdBy", "name username profilePic")
  posts = posts.map((post: IPost) => ({
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