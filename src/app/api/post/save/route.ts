import loggedInUser from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
  const {postId} = await req.json()

  const decode = await loggedInUser()

  // const User = await User.findById(decode.id)

  const savedPost = await User.findByIdAndUpdate(decode.id, {push: {saved: postId}})

  return NextResponse.json({savedPost: savedPost.saved})
}