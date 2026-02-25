"use client";

import { Save } from "@/actions/savePost";
import { useState } from "react";

const SaveButton = ({ post, currentUser }) => {
  const [savedBy, setSavedBy] = useState(post.saved.length);
  const [savedByCurrentUser, setSavedByCurrentUser] = useState<boolean>(
    post.saved.includes(currentUser)
  );

  const saveHandler = async () => {
    const response = await Save(post._id);
    if (response?.success) {
      setSavedBy(response.savedByLength);
      setSavedByCurrentUser(!savedByCurrentUser);
    }
  };

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
        savedByCurrentUser
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      }`}
      onClick={saveHandler}
      aria-pressed={savedByCurrentUser}
      aria-label="Save post"
    >
      <svg
        className="h-5 w-5"
        fill={savedByCurrentUser ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      <span className="tabular-nums">{savedBy}</span>
    </button>
  );
};

export default SaveButton;
