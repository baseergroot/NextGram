"use clientt"

import axios from 'axios'
import React from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'

const Like = ({postId}) => {
  const LikePost = postId => {
    console.log("postid", postId)
    axios.post("/api/post/like", {postId: postId.toString()})
  }
  return (
    <button onClick={() => LikePost(postId)}>
      <IoMdHeartEmpty />
    </button>
  )
}

export default Like