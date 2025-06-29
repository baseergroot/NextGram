"use client"
import { FaRegCommentDots } from "react-icons/fa";
import Like from "../actionButtons/like";
import { useLike } from "@/lib/LikesContext";
import { IoSaveOutline } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";

const FeedDetails = ({postId, title, saves, comments}) => {
  const { likes } = useLike();
  const [savedPostsLength, setSavedPostsLength] = useState(saves)
  const SaveButton = (postId) => {
     axios.post("/api/post/save", {postId: postId.toString()})
    .then(res => setSavedPostsLength(res.data.savedByLength))
  }
  return (
    <section className=" h-[11%] flex flex-col justify-between px-3 mb-4">
      <p className="font-bold">{title}</p>
      <div className="flex gap-10 text-2xl">
        <div className="flex items-center gap-2">
          <Like postId={postId} />
          <span className="text-[20px]">{likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/post/${postId}`} > <FaRegCommentDots className="" /></Link>
          <span className="text-[20px]">{comments.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => SaveButton(postId)}><IoSaveOutline /></button>
          <p className="text-[20px]">{savedPostsLength}</p>
        </div>
      </div>
    </section>
  );
};

export default FeedDetails;