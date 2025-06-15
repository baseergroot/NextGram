"use client"

import { FaRegCommentDots } from "react-icons/fa";
import Like from "../actionButtons/like";
import { useState } from "react";

const FeedDetails = ({postId, likes}) => {
  const [likecount, setLikeCount] = useState()
  return (
    <section className=" h-[15%] flex flex-col gap-2 justify-between px-3">
      <p className="font-bold">watch my moves</p>
      <div className="flex gap-10 text-2xl">
        <div className="flex items-center gap-2">
          <Like postId={postId}/>
          <span className="text-[20px]">{likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCommentDots className="" />
          <span className="text-[20px]">10</span>
        </div>
      </div>
    </section>
  );
};

export default FeedDetails;
