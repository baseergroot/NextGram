"use client"
import { FaRegCommentDots } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { Save } from "@/actions/savePost";
import { IoMdHeartEmpty } from "react-icons/io";
import { LikeAction } from "@/actions/likePost";

const FeedDetails = ({postId, title, saves, comments, likes}) => {
  const [savedPostsLength, setSavedPostsLength] = useState(saves)
  const [likesCount, setLikesCount] = useState<number>(likes.length)
  const SaveButton = async () => {
     const response = await Save(postId)
     response.success ? setSavedPostsLength(response.savedByLength) : console.log("Something went wrong")
  }
  const LikeBtn = async () => {
    const response = await LikeAction(postId)
    response.success ? setLikesCount(response.updatedPost.likes.length) : console.log("Something went wrong")
  }
  return (
    <section className=" h-[15%] flex flex-col justify-between px-3 mb-4">
      <p className="font-bold">{title}</p>
      <div className="flex gap-10 text-2xl">
        <div className="flex items-center gap-2">
          <button onClick={LikeBtn} className="cursor-pointer">
                <IoMdHeartEmpty />
          </button>
          <span className="text-[20px]">{likesCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/post/${postId}`} > <FaRegCommentDots className="" /></Link>
          <span className="text-[20px]">{comments.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => SaveButton()} className="cursor-pointer"><IoSaveOutline /></button>
          <p className="text-[20px]">{savedPostsLength}</p>
        </div>
      </div>
    </section>
  );
};

export default FeedDetails;