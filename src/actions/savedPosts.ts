"use server"
import ConnectDB from "@/lib/ConnectDb";
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { UserI } from "@/types/UserType";


await ConnectDB();
export async function Saved() {
  try {
    const decode = await loggedInUser();
    const user:UserI = await (User as any).findById(decode.id)
      .select("-password")
      .populate("saved", "file")
    console.log("Success")

    return { success: true, 
      user: {
      _id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      // profilePic: user.profilePic,
      // followers: user.followers.map((id: any) => id.toString()),
      // followings: user.followings.map((id: any) => id.toString()),
      // followedByCurrentUser: !!user.followedByCurrentUser,
      saved: user.saved.map((save) => ({
        _id: save._id.toString(),
        file: save.file
      })),
    } }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Something went wrong" }
  }
}

