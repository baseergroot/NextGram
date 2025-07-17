"use server"
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";

export async function Save(postId) {
  console.log("postid:", postId)

  const decode = await loggedInUser()

  const user = await (User as any).findById(decode.id)

  if (user.saved.includes(postId)) {
    console.log("already saved")
    const savedPost = await (User as any).findByIdAndUpdate(decode.id,
      {$pull: {saved: postId}},
      {new: true})
    const savedBy  = await (Post as any).findByIdAndUpdate(postId,
      {$pull: {saved: decode.id}},
      {new: true})
    return {success: true, savedByLength: savedBy.saved.length}
  }
  else{
    console.log("not saved")
    const savedPost = await (User as any).findByIdAndUpdate(decode.id,
      {$push: {saved: postId}},
      {new: true})
    const savedBy  = await (Post as any).findByIdAndUpdate(postId,
      {$push: {saved: decode.id}},
      {new: true})
    return {success: true, savedByLength: savedBy.saved.length}
  }
}
