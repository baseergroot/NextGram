"use client"

import { Save } from "@/actions/savePost";
import { useState } from "react";
import { BiSolidSave } from "react-icons/bi";

const SaveButton = ({ post }) => {

  const [savedBy, setSavedBy] = useState(post.saved.length)

  const saveHandler = async () => {
    const response = await Save(post._id)
    response?.success ? setSavedBy(response.savedByLength) : console.log("something went wrong at save button")
  }

  return (
    <button className="flex gap-1 items-center text-xl" onClick={saveHandler}>
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
      <span>{savedBy}</span>
    </button>
  )
}

export default SaveButton
