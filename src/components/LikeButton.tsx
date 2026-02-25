"use client";

import { LikeAction } from "@/actions/likePost";
import { useActionState, useEffect, useState, useTransition } from "react";
import { IoMdHeart } from "react-icons/io";

const initialState = {};

const LikeButton = ({ post, currentUser }) => {
  const [likes, setLikes] = useState(post.likes.length);
  const [state, likeAction, pending] = useActionState(LikeAction, initialState);
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState<boolean>(post.likes.includes(currentUser));

  useEffect(() => {
    if (state?.success) {
      setLikes(state.updatedPost.likes.length);
    }
  }, [state]);

  const handleLike = () => {
    startTransition(() => {
      likeAction(post._id);
      setLiked(!liked);
    });
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        liked ? "text-rose-600" : "text-muted-foreground hover:text-foreground"
      } ${isPending || pending ? "opacity-60" : ""}`}
      onClick={handleLike}
      disabled={isPending || pending}
      aria-pressed={liked}
      aria-label="Like post"
    >
      <IoMdHeart className="h-5 w-5" />
      <span className="tabular-nums">{likes}</span>
    </button>
  );
};

export default LikeButton;
