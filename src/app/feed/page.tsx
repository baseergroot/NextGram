
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { PostI } from "@/types/PostType";
import { UserI } from "@/types/UserType";
import Feed from "@/components/Feed";

await ConnectDB()
const Page = async () => {
    let posts: PostI[] = await (Post as any).find().populate("createdBy", "name username profilePic")
    posts = posts.map(post => ({
        _id: post._id.toString(),
        title: post.title,
        file: post.file,
        createdBy: {
            id: post.createdBy._id.toString(),
            username: post.createdBy.username,
            name: post.createdBy.name,
            profilePic: post.createdBy.profilePic
        },
        likes: post.likes.map((id: any) => id.toString()),
        comments: post.comments.map((id: any) => id.toString()),
        saved: post.saved.map((id: any) => id.toString())
    })).reverse()
    const decode: Decode = await loggedInUser()
    const user: UserI = await (User as any).findById(decode.id)
    // console.log(posts[0])
    const profilePic = user.profilePic
    
    if (!posts) {
        console.log("something went wrong")
        return (
            <p  className="content-center">
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
            <Feed posts={posts}/>
            <BottomNavbar />
        </div>
    )
}

export default Page
