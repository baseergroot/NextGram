
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import loggedInUser from "@/helpers/getLoggedInUser";
import Feed from "@/components/Feed";
import getposts from "@/helpers/getPosts";

const Page = async () => {

	const posts = await getposts()
	// const decode: Decode = await loggedInUser()
	const decode = await loggedInUser()

	// console.log(posts[0])
	const profilePic: string | undefined = decode.profilePic


	if (!posts) {
		console.log("something went wrong")
		return (
			<p className="content-center">
				Something went wrong! <br />
				No Post to be shown
			</p>
		)
	} 

	return (
		<div className="w-full h-full flex flex-col gap-0.5 scroll-smooth ">
			<NavbarComponent profilePic={profilePic} decode={decode} />
			<Feed posts={posts} decode={decode} />
			<BottomNavbar />
		</div>
	)
}

export default Page
