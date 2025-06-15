import ConnectDB from "@/lib/ConnectDb";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";


export async function GET() {
  console.log("🔄 /api/feed hit");
  await  ConnectDB()
  const posts = await Post.find().populate("createdBy", "name username")

  if (posts) {
    console.log({posts})
    return NextResponse.json({ok:true, posts})
  }
  return NextResponse.json({message: "no post to be shown"})
}