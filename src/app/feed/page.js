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

    useEffect(() => {
        axios.get("/api/feed")
    .then(res => {
        setPosts(res.data.posts)
        console.log(res.data.posts)
    }).catch(err => console.log("error is", err))
    },[])
    return (
        <div className="">
        <NavbarComponent />
            <Suspense fallback={<p>Loading feed...</p>}>
                <main className="aspect-6/8 mb-10">
              {
                posts.map(post => (
                <Fragment key={post._id}>
                    <FeedHeader name={post.createdBy.name} username={post.createdBy.username}/>
                    <FeedContent file={post.file}/>
                    <LikeProvider initialLikes={post.likes.length}>
                    <FeedDetails  postId={post._id}/>
                    </LikeProvider>
                </Fragment>
                ))
              }
            </main>
            </Suspense>
        <BottomNavbar />
        </div>
    )
}

export default Feed