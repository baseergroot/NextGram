"use client"

import { LikeAction } from '@/actions/likePost'
import React, { useActionState, useEffect, useState, useTransition } from 'react'
import { IoMdHeart } from 'react-icons/io'

const initialState = {}

const LikeButton = ({ post, currentUser }) => {
  console.log({ currentUser })
  const [likes, setLikes] = useState(post.likes.length)
  const [state, likeAction, pending] = useActionState(LikeAction, initialState)
  const [isPending, startTransition] = useTransition()
  const [liked, setLiked] = useState<boolean>(post.likes.includes(currentUser))

  useEffect(() => {
    if (state?.success) {
      setLikes(state.updatedPost.likes.length)
    }
  }, [state])

  const handleLike = () => {
    startTransition(() => {
      likeAction(post._id)
      setLiked(!liked)
    })
  }

  return (
    <button className="flex gap-1 items-center text-xl" onClick={handleLike} disabled={isPending || pending}>
      <IoMdHeart className="text-2xl" color={liked ? 'red' : undefined} />
      <span>{likes}</span>
    </button>
  )
}

export default LikeButton


