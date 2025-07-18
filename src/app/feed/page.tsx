// "use client"
import { Feed } from "@/actions/feed";
import FeedContent from "@/components/(feed)/content";
import FeedDetails from "@/components/(feed)/details";
import FeedHeader from "@/components/(feed)/header";
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import { PostI } from "@/types/PostType";
import { Fragment } from "react";

const FeedPage = async () => {
    const response = await Feed()
    if (!response.ok) {
        console.log("something went wrong")
    }
    // console.log({ response })
    const posts = response.posts.reverse()
    const profilePic = response.profilePic

    if (posts.length == 0) {
        return "Loading..."
    }
    return (
        <div className="w-full h-full scroll-smooth">
            <NavbarComponent profilePic={profilePic} />
            <main className=" mb-10 flex flex-col gap-3 mx-auto mt-5 lg:mt-10 md:w-2/3 lg:max-w-6/10 lg:max-h-9/10 xl:max-w-3/10">
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
            <BottomNavbar />
        </div>

    )
}

export default FeedPage
