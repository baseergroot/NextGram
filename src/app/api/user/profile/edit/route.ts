import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const {file, name, username} = await request.json()
  console.log(name)
  const decode:Decode = await loggedInUser()

  await ConnectDB()
  const user = await (User as any).findByIdAndUpdate(decode.id, {name, username, profilePic: file})
  return NextResponse.json(user)
}

// Done. Shifted to server action