"use server"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
import User from "@/models/UserModel"
import { UserI } from "@/types/UserType"

export async function FollowAction(userId: string) {
  console.log("userid:", userId)
  const decode = await loggedInUser()
  // console.log(decode.id, userId)
  
  let user: UserI = await (User as any).findByIdAndUpdate(userId, { $push: { followers: decode.id } })

  await ConnectDB()
    if (decode.id == userId) {
      console.log("cannot follow yourself")
      return { success: false, message: "cannot follow yourself" }
    }
    if (user.followers.includes(userId)) {
      user = await (User as any).findByIdAndUpdate(userId, { $pull: { followers: decode.id } })
      await (User as any).findByIdAndUpdate(decode.id, { $pull: { followings: userId } })
      console.log("successfully unfollowed", user.followers.length)
      return { success: true, 
        userFollowers: user.followers.map(_id => _id.toString()) }
    }
    else {
      user = await (User as any).findByIdAndUpdate(userId, { $push: { followers: decode.id } })
      await (User as any).findByIdAndUpdate(decode.id, { $push: { followings: userId } })
      console.log("successfully followed", user.followers.length)
      return { success: true, 
        userFollowers: user.followers.map(_id => _id.toString()) }
    }
}

