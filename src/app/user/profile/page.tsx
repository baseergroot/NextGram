import ProfileComponent from "@/components/ProfileComponent";
import ConnectDB from "@/lib/ConnectDb";
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";

await ConnectDB();

export const metadata = {
  title: "User Profile",
  description: "NextGram profile route, page",
};

export default async function ProfilePage() {
  const decode = await loggedInUser();
   const user = await (User as any).findById(decode.id)
      .select("-password")
      .populate("posts", "file");
    console.log({ user });

  const response = {
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
  
  return <ProfileComponent response={response} />
}
