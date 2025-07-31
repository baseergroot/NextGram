"use client"

import { Save } from "@/actions/savePost";
import { useState } from "react";
import {BiSolidSave} from "react-icons/bi";

const SaveButton = ({post}) => {

  const [savedBy, setSavedBy] = useState(post.saved.length)

  const saveHandler = async () => {
    const response = await Save(post._id)
    response?.success ? setSavedBy(response.savedByLength) : console.log("something went wrong at save button")
  }

  return (
    <button className="flex gap-1 items-center text-xl" onClick={saveHandler}> 
      <BiSolidSave className="text-2xl"/>
      <span>{savedBy}</span>
    </button>
  )
}

export default SaveButton