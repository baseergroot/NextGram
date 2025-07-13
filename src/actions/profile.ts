"use server"
import ConnectDB from "@/lib/ConnectDb";
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";

await ConnectDB();

export async function Profile() {
  const decode = await loggedInUser();

  try {
    const user = await (User as any).findById(decode.id)
      .select("-password")
      .populate("posts", "file");
    console.log({ user });
    const safeUser = {
      _id: user._id.toString(),
      name: user.name,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      followers: user.followers.map((id: any) => id.toString()),
      followings: user.followings.map((id: any) => id.toString()),
      followedByCurrentUser: !!user.followedByCurrentUser,
      saved: user.saved.map((id: any) => id.toString()),
      posts: user.posts.map((p: any) => ({
        id: p._id.toString(),
        file: p.file,
      }))
    }
    return { success: true, user: safeUser }
  } catch (error) {
    console.log("error is:", error)
    return { success: false, error: error.message }
  }
}
