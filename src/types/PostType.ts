import { Types } from "mongoose";
import { CommentI, IComment } from "./CommentType";
import { UserI } from "./UserType";

export interface PostI {
  _id: Types.ObjectId | string;
  title: string;
  file: string;
  createdBy: UserI;
  likes: Types.ObjectId[];
  comments: CommentI[] | string[];
  saved: UserI[] | string[];
}


export interface IPost {
  _id: string;
  title: string;
  file: string;
  createdBy: UserI;
  likes: string[];
  comments:string[];
  saved: string[];
}

export interface ParamPostI  {
    _id: string
    title: string
    file: string
    comments: IComment[] | string[]
    likes: string[]
    saved: string[]
    createdBy: UserI
  }
