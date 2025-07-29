"use server"
import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";

await ConnectDB()

export async function ProfileEdit(data) {
  const {profilePic, name, username} = data
  console.log(name, username, profilePic)
  const decode:Decode = await loggedInUser()

  const user = await (User as any).findByIdAndUpdate(decode.id, {name, username, profilePic})
  return { success: true }
}
