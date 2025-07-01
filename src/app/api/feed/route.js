import ConnectDB from "@/lib/ConnectDb";
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";


export async function GET() {
  console.log("🔄 /api/feed hit");
  await  ConnectDB()
  const posts = await Post.find().populate("createdBy", "name username profilePic")
  const decode = await loggedInUser()
  const  user = await User.findById(decode.id)
  
  if (posts) {
    console.log({posts})
    return NextResponse.json({ok:true, posts, profilePic: user.profilePic})
  }
  return NextResponse.json({message: "no post to be shown", profilePic: user.profilePic})
}