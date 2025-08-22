import { Types } from "mongoose"
import { PostI } from "./PostType"
import { UserI } from "./UserType"

export interface CommentI {
  _id?: Types.ObjectId | string,
  createdBy?: UserI | Types.ObjectId | string,
  content?: string,
  post?: PostI | string | Types.ObjectId,
  likes?: UserI[] | string[] | Types.ObjectId[],
  disLikes?: UserI[] | string[] | Types.ObjectId[]
}