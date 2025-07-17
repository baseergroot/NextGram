import UserComponent from "@/components/UserComponent"
import ConnectDB from "@/lib/ConnectDb"
import Post from "@/models/PostModel"
import User from "@/models/UserModel"
import { PostI } from "@/types/PostType"
import { UserI } from "@/types/UserType"

await ConnectDB()

export default async function UserPage({params}) {
  const {username} = await params
  console.log(username)
  let user:UserI = await (User as any).findOne({username})
  let posts:PostI[] = await (Post as any).find({createdBy: user._id})
  user = {
    _id:  user._id,
    name: user.name,
    username: user.name,
    profilePic: user.profilePic,
    followers: user.followers,
    followings: user.followings,
    bio: user.bio
  }
  posts = posts.map(post => ({
    _id: post._id.toString(),
    title: post.title,
    file: post.file
  }))
  // console.log({user}, posts[0])

  return <UserComponent userDetail={user} posts={posts} />
}
