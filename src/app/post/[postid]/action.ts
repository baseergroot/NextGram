// import ConnectDB from "@/lib/ConnectDb"
// import { PostI } from "@/types/PostType"



// export async function PostAction(postid) {
//   await ConnectDB()
//   let post: PostI = await (Post as any).findById(postid).populate("createdBy", "name username profilePic")
//   post = {
//     _id: post._id.toString(),
//     title: post.title,
//     file: post.file,
//     // comments: post.comments,
//     likes: post.likes.map((_id) => _id.toString()),
//     saved: post.saved.map((_id) => _id.toString()),
//     createdBy: {
//       name: post.createdBy.name,
//       username: post.createdBy.username,
//       profilePic: post.createdBy.profilePic
//     }
//   }
//   console.log({ post })
// }