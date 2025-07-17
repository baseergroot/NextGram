import ConnectDB from "@/lib/ConnectDb"
import Post from "@/models/PostModel"
import { NextResponse } from "next/server"
import User from "@/models/UserModel"
import loggedInUser from "@/lib/getLoggedInUser"

export async function POST(req) {
  const {title, file} = await req.json()
  console.log({title, file})
  const decode = await loggedInUser()
  console.log({decode})
  // connect database
  await ConnectDB()
  const post = await Post.create({title, file, createdBy: decode.id})
  // console.log(post)
  await User.findByIdAndUpdate(decode.id, {$push: {posts: post._id}})
  return NextResponse.json({OK: true})
}

// Done. Shifted to server action