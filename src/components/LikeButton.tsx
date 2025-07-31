"use client"

import { LikeAction } from '@/actions/likePost'
import React, { useState } from 'react'
import { IoMdHeart } from 'react-icons/io'

const LikeButton = ({post}) => {
  const [likes, setLikes] = useState(post.likes.length)

  const LikeHandler = async () => {
    const response = await LikeAction(post._id)
    response.success ? setLikes(response.updatedPost.likes.length) : console.log("something went wrong at  like post")
  }
  return (
    <button className="flex gap-1 items-center text-xl" onClick={LikeHandler}>
      <IoMdHeart  className="text-2xl"/>
      <span>{likes}</span>
    </button>
  )
}

export default LikeButton