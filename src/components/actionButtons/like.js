"use clientt"

import { useLike } from '@/lib/LikesContext'
import axios from 'axios'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'

const Like = ({postId}) => {
  const { setLikes } = useLike();
  const LikePost = postId => {
    console.log("postid", postId)
    axios.post("/api/post/like", {postId: postId.toString()})
    .then(res => setLikes(res.data.updatedPost.likes.length))
  }
  return (
    <button onClick={() => LikePost(postId)}>
      <IoMdHeartEmpty />
    </button>
  )
}

export default Like