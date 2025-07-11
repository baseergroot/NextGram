import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
import Post from "@/models/PostModel" // it's necessary since we want username and name from post schema
import User from "@/models/UserModel"
import { NextResponse } from "next/server"

export async function POST(req) {
  const {userId} = await req.json() // clientId
  console.log("userid:", userId)
  const decode = await loggedInUser()
  await ConnectDB()
  try {
    const user = await User.findByIdAndUpdate(userId, { $push: {followers: decode.id}})
  await User.findByIdAndUpdate(decode.id, { $push: {followings: userId}})
  console.log("successfully followed")
  return NextResponse.json({ok: true, userFollowers: user.followers})
  } catch (error) {
    return NextResponse.json({error})
  }
}