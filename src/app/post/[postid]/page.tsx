import LikeaComment from "@/components/LikeaComment"
import LikeButton from "@/components/LikeButton"
import SaveButton from "@/components/SaveButton"
import ConnectDB from "@/lib/ConnectDb"
import loggedInUser from "@/lib/getLoggedInUser"
import User from "@/models/UserModel"
import Post from "@/models/PostModel"
import Comment from "@/models/CommentModel"
import { CommentI } from "@/types/CommentType"
import { PostI } from "@/types/PostType"
import { Button } from "flowbite-react"
import { revalidatePath } from "next/cache"
import Image from "next/image"
import { models } from "mongoose"

await ConnectDB()
const PostRoute = async ({ params }) => {
  const { postid } = await params
  const decode = await loggedInUser()
  console.log(models);
  let post = await Post.findById(postid).populate({path: "createdBy", select: "name username profilePic"}).populate({
    path: "comments",
    select: "content createdBy likes",
    populate: {
      path: "createdBy",
      select: "name username profilePic"
    }
  })
  post = {
    _id: post._id.toString(),
    title: post.title,
    file: post.file,
    comments: post.comments.map((comment) => ({
      _id: comment._id.toString(),
      content: comment.content,
      createdBy: {
        name: comment.createdBy.name,
        username: comment.createdBy.username,
        profilePic: comment.createdBy.profilePic
      },
      likes: comment.likes.map((_id) => _id.toString())
    })),
    likes: post.likes.map((_id) => _id.toString()),
    saved: post.saved.map((_id) => _id.toString()),
    createdBy: {
      name: post.createdBy.name,
      username: post.createdBy.username,
      profilePic: post.createdBy.profilePic
    }
  }
  let comments = post.comments
  // console.log({ post })
  console.log({ comment: comments[0] })

  console.log(postid)
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Main Post Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 overflow-hidden mb-8 hover:shadow-md transition-shadow duration-300">
          {/* Post Header */}
          <div className="p-4 border-b border-gray-50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image
                  src={post.createdBy.profilePic}
                  width={56}
                  height={56}
                  alt="Profile"
                  className="rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{post.createdBy.name}</h3>
                <p className="text-gray-500 text-sm">@{post.createdBy.username}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Post media */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
            {
              post.file.endsWith('.mp4') ? <video controls src={post.file}
                className="w-full h-auto object-cover"></video> :
                <Image
                  src={post.file}
                  width={600}
                  height={400}
                  alt="Post content"
                  className="w-full h-auto object-cover"
                />
            }
          </div>

          {/* Post Content */}
          <div className="p-6">
            <p className="text-gray-900 text-lg font-medium leading-relaxed mb-4">{post.title}</p>

            {/* Engagement Stats */}
            <div className="flex items-center justify-between py-4 border-t border-gray-50">
              <div className="flex items-center gap-6 ">
                <LikeButton post={post} />

                <div className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors cursor-pointer">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-xl">{post.comments?.length || 0}</span>
                </div>


                <SaveButton post={post} />
              </div>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-6 mb-8">
          <form action={
            async (form: FormData) => {
              "use server"
              await ConnectDB()
              const content = form.get("comment") as string
              console.log(typeof content, await Comment.validate({ content, createdBy: decode.id, post: postid }))
              const comment = await (Comment as any).create({ content, createdBy: decode.id, post: postid })
              await (Post as any).findByIdAndUpdate(postid, { $push: { comments: comment._id } })
              revalidatePath(`/post/{postid}`)
            }
          } className="space-y-4">
            <div className="relative">
              <textarea
                name="comment"
                placeholder="Share your thoughts..."
                className="w-full p-4 pr-12 bg-gray-50/50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 min-h-[100px]"
                rows={3}
              />
              <div className="absolute bottom-3 right-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2.5 rounded-xl font-medium text-white shadow-sm hover:shadow-md transition-all duration-200 border-0 focus:ring-2 focus:ring-blue-500/20"
              >
                Post Comment
              </Button>
            </div>
          </form>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Comments ({post.comments?.length || 0})
          </h2>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="bg-white rounded-xl shadow-sm border border-gray-100/80 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={comment.createdBy.profilePic || "/defaultProfile.png"}
                      width={44}
                      height={44}
                      alt="Commenter profile"
                      className="rounded-full object-cover ring-2 ring-gray-100"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-2">
        {/* <h4 className="font-semibold text-gray-900">{comment.createdBy.name || "guest"}</h4> */}
        <span className="text-gray-500 text-sm">{comment.createdBy.username || "guest"}</span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-400 text-xs">1h ago</span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-3">{comment.content}</p>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm">
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

                  {/* <LikeaComment comment={comment}/> */}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-gray-100/80 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
              <p className="text-gray-500">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        <p className="flex p-5 items-center justify-center bg-yellow-400 rounded-xl text-xl font-bold">In Development</p>
        {
        comments.map(comment => (
        <section key={comment._id}>
        <p>comment: {comment.content}, {comment.createdBy.name},  </p>
        </section>
        ))
        }
      </div>
    </div>
  )
}

export default PostRoute