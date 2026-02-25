"use client";

import { LikeAComment } from "@/actions/likeAComment";
import { useState } from "react";

const LikeaComment = ({ comment }) => {
  const [likes, setLikes] = useState<number>(comment.likes.length);

  const handleLike = async () => {
    const response = await LikeAComment(comment._id);
    setLikes(response.likes.length);
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">
          {comment.createdBy.username || "guest"}
        </span>
        <span>•</span>
        <span>Just now</span>
      </div>

      <p className="mt-2 text-sm text-foreground">{comment.content}</p>

      <div className="mt-3 flex items-center gap-4">
        <button
          onClick={handleLike}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-rose-600"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{likes || 0}</span>
        </button>

        <button className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
          Reply
        </button>
      </div>
    </div>
  );
};

export default LikeaComment;
