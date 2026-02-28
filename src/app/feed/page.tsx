
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { IPost, PostI } from "@/types/PostType";
import { UserI } from "@/types/UserType";
import Feed from "@/components/Feed";
import redis from "@/lib/redis/client";
import getposts from "@/helpers/getPosts";

await ConnectDB()
const Page = async () => {
	const key = "posts"
	const cachedData: IPost | null = await redis.get(key);

	const posts = await getposts()
	const decode: Decode = await loggedInUser()
	const user: UserI = await (User as any).findById(decode.id)
	// console.log(posts[0])
	const profilePic = user.profilePic

	if (!posts) {
		console.log("something went wrong")
		return (
			<p className="content-center">
				Something went wrong! <br />
				No Post to be shown
			</p>
		)
	}

	if (posts.length == 0) {
		return <h1 className="flex justify-center items-center w-full h-full text-2xl font-semibold">Loading</h1>
	}
	return (
		<div className="w-full h-full flex flex-col gap-0.5 scroll-smooth ">
			<NavbarComponent profilePic={profilePic} />
			<Feed posts={posts} />
			<BottomNavbar />
		</div>
	)
}

export default Page
