import { Types } from "mongoose"
import { PostI } from "./PostType"
import { UserI } from "./UserType"

export interface CommentI {
  _id?: Types.ObjectId,
  createdBy?: UserI | string,
  content?: string,
  post?: PostI | string
  likes: UserI[] | string[],
  disLikes: UserI[] | string[]
}