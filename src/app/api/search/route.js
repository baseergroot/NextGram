import ConnectDB from "@/lib/ConnectDb"
import User from "@/models/UserModel"
import { NextResponse } from "next/server"


export async function POST(req) {
  const searchInput = await req.json()
  if (!searchInput) {
    console.log("route recieve", searchInput)
  return NextResponse.json({ message:  "empty input" });
}
console.log("route recieve", searchInput)

  // await ConnectDB()
  // const users = await User.find()
  // const result = users.filter(user => user.username.toLowerCase().includes(searchInput.toLowerCase()))
  // console.log("result: ", result)
  return NextResponse.json({ok: true})
}