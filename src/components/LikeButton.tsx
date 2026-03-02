"use client"

import { LikeAction } from '@/actions/like/likePost'
import { LikeActionResponseI } from '@/types/likePostResponse'
import { IPost } from '@/types/PostType'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { IoMdHeart } from 'react-icons/io'

const initialState: LikeActionResponseI = {
  success: false
}

const LikeButton = ({ post, currentUser }: {
  post: IPost,
  currentUser: string | undefined
}) => {
  // console.log({ currentUser })
  const [likes, setLikes] = useState<number | undefined>(post.likes.length)
  const [state, likeAction, pending] = useActionState(LikeAction, initialState)
  const [isPending, startTransition] = useTransition()
  const [liked, setLiked] = useState<boolean>(post.likes.includes(currentUser!))
  const [likeStatus, setLikeStatus] = useState<boolean>(false)


  useEffect(() => {
    if (state.success) {
      setLikes(state.updatedPost?.likes?.length)
    }
  }, [state])

  const handleLike = () => {
    setLiked(!liked)
    try {
      startTransition(() => {
        likeAction(post._id)
        setLikeStatus(true)
        // setLiked(!liked)
      })
    } catch (error) {
      console.log("error like reverted")
      setLiked(!liked)
    } 
  }

  return (
    <button className="flex gap-1 items-center text-xl" onClick={handleLike} disabled={isPending || pending}>
      <IoMdHeart className="text-2xl" color={liked ? 'red' : undefined} />
      <span>{likes}</span>
    </button>
  )
}

export default LikeButton


