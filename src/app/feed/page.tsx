import FeedContent from "@/components/(feed)/content";
import FeedDetails from "@/components/(feed)/details";
import FeedHeader from "@/components/(feed)/header";
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import { Fragment, Suspense } from "react";
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { PostI } from "@/types/PostType";
import { UserI } from "@/types/UserType";

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
    console.log({ user })
    
    if (!posts) {
        console.log("something went wrong")
        return (
            <>
            <p  className="content-center">
                Something went wrong! <br />
                No Post to be shown
            </p>
            </>
        )
    }
    const profilePic = user.profilePic

    if (posts.length == 0) {
        return "Loading..."
    }
    return (
        <div className="w-full h-full scroll-smooth">
            <NavbarComponent profilePic={profilePic} />
            <Suspense fallback={<p>Loading...</p>}>
                <main className=" mb-10 flex flex-col gap-3 mx-auto mt-5 h-8/10 lg:mt-10 md:w-2/3 lg:max-w-6/10 lg:max-h-9/10 xl:max-w-3/10">
                {
                    posts.map(post => (
                        <Fragment key={post._id as string}>
                            <FeedHeader name={post.createdBy.name} username={post.createdBy.username} profilePic={post.createdBy.profilePic} />
                            <FeedContent file={post.file} />
                            <FeedDetails postId={post._id.toString()} title={post.title} saves={post.saved.length} comments={post.comments} likes={post.likes} />
                        </Fragment>
                    ))
                }
            </main>
            </Suspense>
            <BottomNavbar />
        </div>

    )
}

export default Page
