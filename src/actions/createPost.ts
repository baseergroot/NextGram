"use server"
import ConnectDB from "@/lib/ConnectDb"
import Post from "@/models/PostModel"
import User from "@/models/UserModel"
import loggedInUser from "@/lib/getLoggedInUser"

// connect database
  await ConnectDB()

export async function CreatePost(data: {title: string, file: string}) {
  const {title, file} = data
  console.log({title, file})
  if (title === "" || file === "") {
    console.log("fields are empty")
    return {success: false, error: "fields are empty"}
  }
  const decode = await loggedInUser()
  console.log({decode})
  
  const post = await (Post as any).create({title, file, createdBy: decode.id})
  console.log(post)
  await (User as any).findByIdAndUpdate(decode.id, {$push: {posts: post._id}})
  return {success: true}
}
