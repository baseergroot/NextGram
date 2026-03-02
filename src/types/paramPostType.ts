import { IComment } from "./CommentType"
import { UserI } from "./UserType"


export interface ParamPostI  {
    _id: string
    title: string
    file: string
    comments: IComment[] | string[]
    likes: string[]
    saved: string[]
    createdBy: UserI
  }