"use client"

import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'
import { useState } from 'react';
import { ArrowLeft, MessageCircle, Heart, Share, ThumbsUp, ThumbsDown } from 'lucide-react';
import Image from 'next/image';
import BottomNavbar from "@/components/BottomNavbar"

const Post = () => {
  const [replyText, setReplyText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(34);
  const [postDetail, setPostDetail] = useState({})
  const  [comments, setComments] = useState([])
  const {postid} =  useParams()
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    // axios.post("/api/post/like", {postid: postid.toString()})
  };
  // console.log("postid:", postid)
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.post("/api/post/postid", {
        postid: postid.toString()
      });
      
      const post = res.data.post;
      setPostDetail(post);
      setLikeCount(res.data.post.likes.length)
      setComments(post.comments.reverse())
      console.log("type:",typeof post, ",", "data:", post)
      
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };
  
  fetchData();
}, [postid]);

  

  if (!postDetail) {
    return <p>Loading...</p>
  }else {

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <ArrowLeft className="w-6 h-6 text-gray-700" />
        <h1 className="text-lg font-semibold text-gray-900">Post </h1>
        <div className="w-6"></div>
      </div>

      {/* Main Post */}
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
            {/* <div className="w-8 h-8 bg-gray-800 rounded-full"></div> */}
            <Image
            className='rounded-full'
            src={postDetail.createdBy?.profilePic ? postDetail.createdBy?.profilePic : "/defaultProfile.png"} alt='profile' width={50} height={50}/>
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-gray-900">{postDetail.createdBy?.name}</h2>
            <p className="text-gray-600">@{postDetail.createdBy?.username}</p>
          </div>
        </div>

        <p className="text-gray-900 text-base leading-relaxed mb-4">
          {postDetail.title}
        </p>

        {/* Image */}
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={postDetail.file}
            alt="Team meeting" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">{postDetail.comments?.length}</span>
            </div>
            <button 
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <Heart className={`w-5 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
              <span className="text-gray-600">{likeCount}</span>
            </button>
            <div className="flex items-center space-x-1">
              <Share className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">{postDetail.saved?.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            {/* <div className="w-6 h-6 bg-gray-600 rounded-full"></div> */}
            <Image
            className='rounded-full'
            src={postDetail.createdBy?.profilePic ? postDetail.createdBy?.profilePic : "/defaultProfile.png"} alt='profile' width={50} height={50}/>
          </div>
          <div className="flex-1">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add your reply"
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
            />
            {replyText && (
              <div className="mt-2 flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" onClick={() => {
                  axios.post("/api/post/comment", {
                    postid: postDetail._id.toString(),
                    content: replyText
                  })
                  .then(res => {
                    setComments(res.data.post.comments.reverse())
                    console.log(res.data.post.comments)
                  })
                  .catch(err => console.log(err))
                  setReplyText("")
                }}>
                  Reply
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reply Thread */}
      <div className="border-t border-gray-200">
        
        {comments.map((comment) => (

        
          <Fragment key={comment._id}>
          <div className="p-4 border-b border-gray-100">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-orange-200 rounded-full flex items-center justify-center">
              {/* <div className="w-6 h-6 bg-gray-800 rounded-full"></div> */}
              <Image
            className='rounded-full'
            src={comment.createdBy.profilePic} alt='profile' width={50} height={50}/>

            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{comment.createdBy.name}</h3>
                <span className="text-gray-500 text-sm">11h</span>
              </div>
              <p className="text-gray-900 mb-2">
                {comment.content}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <button onClick={() => {
                    axios.post("/api/post/comment/like", {commentId: comment._id.toString()})
                    .then(res => comment = res.data.comment)
                  }}><ThumbsUp className="w-4 h-4 text-gray-600" /></button>
                  <span className="text-gray-600 text-sm">{ comment.likes.length }</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsDown className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600 text-sm">32</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Fragment>
        ))
      }
      </div>

      

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
        <BottomNavbar />
      </div>

      {/* Spacer for fixed bottom nav */}
      <div className="h-16"></div>
    </div>
  )
  }
 
}

export default Post
