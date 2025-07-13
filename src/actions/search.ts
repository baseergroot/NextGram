"use server"
import ConnectDB from "@/lib/ConnectDb"
import User from "@/models/UserModel"
import { UserI } from "@/types/UserType"

await ConnectDB() // connect to database
export async function Search(searchInput: string) {

  if (!searchInput) {
    console.log("route recieve", searchInput)
    return { message: "empty input", success: false }
  }
  const users: UserI[] = await (User as any).find({username: { $regex: searchInput, $options: "i" }}).limit(10)
  console.log("route recieve", searchInput)

  return { success: true, 
    users: users.map(user => ({
      _id: user._id.toString(),
      name: user.name,
      username: user.username,
      profilePic: user.profilePic
    }))
   }
}
