"use client"
import FeedContent from "@/components/(feed)/content";
import FeedDetails from "@/components/(feed)/details";
import FeedHeader from "@/components/(feed)/header";
import BottomNavbar from "@/components/BottomNavbar"
import NavbarComponent from "@/components/Navbar"
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

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
            <main className="aspect-6/8 mb-10">
              {
                posts.map(post => (
                <Fragment key={post._id}>
                    <FeedHeader name={post.createdBy.name} username={post.createdBy.username}/>
                    <FeedContent file={post.file}/>
                    <FeedDetails  postId={post._id} likes={post.likes.length}/>
                </Fragment>
                ))
              }
            </main>
        <BottomNavbar />
        </div>
    )
}

export default Feed