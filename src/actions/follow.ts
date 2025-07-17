"use server"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
// import Post from "@/models/PostModel" // it's necessary since we want username and name from post schema
import User from "@/models/UserModel"
import { UserI } from "@/types/UserType"

export async function FollowAction(userId) {
  console.log("userid:", userId)
  const decode = await loggedInUser()
  let user: UserI = await (User as any).findByIdAndUpdate(userId, { $push: { followers: decode.id } })

  await ConnectDB()
  try {
    if (user.followers.includes(userId)) {
      user = await (User as any).findByIdAndUpdate(userId, { $pull: { followers: decode.id } })
      await (User as any).findByIdAndUpdate(decode.id, { $pull: { followings: userId } })
      console.log("successfully unfollowed")
      return { success: true, userFollowers: user.followers }
    }
    else {
      user = await (User as any).findByIdAndUpdate(userId, { $push: { followers: decode.id } })
      await (User as any).findByIdAndUpdate(decode.id, { $push: { followings: userId } })
      console.log("successfully followed")
      return { success: true, userFollowers: user.followers }
    }
  } catch (error) {
    return { success: false, error }
  }
}
