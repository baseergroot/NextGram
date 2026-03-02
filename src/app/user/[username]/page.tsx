import UserComponent from "@/components/user/UserComponent"
import ConnectDB from "@/lib/database/ConnectDb"
import loggedInUser, { Decode } from "@/helpers/getLoggedInUser"
import Post from "@/models/PostModel"
import User from "@/models/UserModel"
import { IPost, PostI } from "@/types/PostType"
import { IUser, UserI } from "@/types/UserType"

await ConnectDB()

export default async function UserPage({ params }) {
  const { username } = await params
  console.log(username)
  let user: IUser = await (User as any).findOne({ username })
  let posts: PostI[] = await (Post as any).find({ createdBy: user._id })
  user = {
    _id: user._id.toString(),
    name: user.name,
    username: user.name,
    profilePic: user.profilePic,
    followers: user.followers.map(_id => _id.toString()),
    followings: user.followings.map(_id => _id.toString()),
    bio: user.bio
  }
  const planPosts: Pick<IPost, '_id' | 'title' | 'file'>[] = posts.map(post => ({
    _id: post._id.toString(),
    title: post.title,
    file: post.file
  }))
  const decode: Decode = await loggedInUser()
  let following: boolean = user.followers.includes(decode?.id?.toString())
  // console.log("Following status:", following)
  // console.log({user}, posts[0])

  return <UserComponent userDetail={user} posts={planPosts} following={following} decode={decode} />
}
