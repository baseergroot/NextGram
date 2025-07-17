"use clientt"

import { LikeAction } from '@/actions/likePost'
import { useLike } from '@/lib/LikesContext'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'

const Like = ({postId}) => {
  const { setLikes } = useLike();
  const LikePost = async postId => {
  console.log("postid", postId)
  const response = await LikeAction(postId)
  response.success ? setLikes(response.updatedPost.likes.length) : console.log("Something went wrong")
  
  }
  return (
    <button onClick={() => LikePost(postId)}>
      <IoMdHeartEmpty />
    </button>
  )
}

export default Like
