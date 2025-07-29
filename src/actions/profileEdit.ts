"use server"
import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";

await ConnectDB()

export async function ProfileEdit(data) {
  const {file, name, username} = data
  console.log(name)
  const decode:Decode = await loggedInUser()

  const user = await (User as any).findByIdAndUpdate(decode.id, {name, username, profilePic: file})
  return { success: true }
}
