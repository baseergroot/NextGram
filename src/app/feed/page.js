"use client"
import FeedContent from "@/components/(feed)/content";
import FeedDetails from "@/components/(feed)/details";
import FeedHeader from "@/components/(feed)/header";
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import { LikeProvider } from "@/lib/LikesContext";
import axios from "axios";
import { Fragment, Suspense, useEffect, useState } from "react";


const Feed = () => {
    const [posts, setPosts] = useState([])
    const [profilePic, setProfilePic] = useState()

    useEffect(() => {
        axios.get("/api/feed")
    .then(res => {
        setPosts(res.data.posts)
        setProfilePic(res.data.profilePic)
        console.log(res.data.posts[0])
    }).catch(err => console.log("error is", err))
    },[])

    if (posts.length == 0) {
        return "Loading..."
    }
    return (
        <div className="">
        <NavbarComponent profilePic={profilePic}/>
                <main className="aspect-6/8 mb-10">
              {
                posts.map(post => (
                <Fragment key={post._id}>
                    <FeedHeader name={post.createdBy.name} username={post.createdBy.username} profilePic={post.createdBy.profilePic}/>
                    <FeedContent file={post.file}/>
                    <LikeProvider initialLikes={post.likes.length}>
                    <FeedDetails  postId={post._id} title={post.title} saves={post.saved.length} comments={post.comments}/>
                    </LikeProvider>
                </Fragment>
                ))
              }
            </main>
        <BottomNavbar />
        </div>
    )
}

export default Feed