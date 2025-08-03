"use client"

import { LikeAComment } from '@/actions/likeAComment'
import React, { useState } from 'react'

const LikeaComment = ({comment}) => {
  const [likes, setLikes]  = useState<number>(comment.likes.length)
  const handleLike = async () => {
    const response = await LikeAComment(comment._id)
    setLikes(response.likes.length)
  }
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        {/* <h4 className="font-semibold text-gray-900">{comment.createdBy.name || "guest"}</h4> */}
        <span className="text-gray-500 text-sm">{comment.createdBy.username || "guest"}</span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-400 text-xs">1h ago</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>

      <div className="flex items-center gap-4">
        <button onClick={handleLike} className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{likes || 0}</span>
        </button>

        <button className="text-gray-500 hover:text-blue-500 transition-colors text-sm font-medium">
          Reply
        </button>
      </div>
    </div>
  )
}

export default LikeaComment