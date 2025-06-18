import User from "@/models/UserModel"
import { NextResponse } from "next/server"


export async function GET(req) {
  // const search = await req.json()
  const search = "112"
  const users = await User.find()
  const result = users.includes(search)
  console.log("result: ", result)
  return NextResponse.json({ok: true, result})
}