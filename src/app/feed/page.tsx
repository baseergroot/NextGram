"use client"
import { Feed } from "@/actions/feed";
import FeedContent from "@/components/(feed)/content";
import FeedDetails from "@/components/(feed)/details";
import FeedHeader from "@/components/(feed)/header";
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import { LikeProvider } from "@/lib/LikesContext";
import { PostI } from "@/types/PostType";
import { Fragment, Suspense, useEffect, useState } from "react";


const FeedPage = () => {
    const [posts, setPosts] = useState<PostI[]>([])
    const [profilePic, setProfilePic] = useState<string>(null)

    useEffect(() => {
        (async () => {
            const response = await Feed()
            if (!response.ok) {
                console.log("something went wrong")
            }
            console.log({response})
            setPosts(response.posts)
            setProfilePic(response.profilePic)
            console.log(response.posts[0])

        })()
    }, [])

    if (posts.length == 0) {
        return "Loading..."
    }
    return (
        <div className="">
            <NavbarComponent profilePic={profilePic} />
            <main className="aspect-6/8 mb-10">
                {
                    posts.map(post => (
                        <Fragment key={post._id as string}>
                            <FeedHeader name={post.createdBy.name} username={post.createdBy.username} profilePic={post.createdBy.profilePic} />
                            <FeedContent file={post.file} />
                            <LikeProvider initialLikes={post.likes.length}>
                                <FeedDetails postId={post._id} title={post.title} saves={post.saved.length} comments={post.comments} />
                            </LikeProvider>
                        </Fragment>
                    ))
                }
            </main>
            <BottomNavbar />
        </div>
    )
}

export default FeedPage