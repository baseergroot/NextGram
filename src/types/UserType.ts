import { Types } from "mongoose";
import { IPost, PostI } from "./PostType";

export interface UserI {
  _id?: Types.ObjectId | string,
  name?: string,
  username?: string,
  email?: string,
  password?: string,
  profilePic?: string,
  bio?: string | null,
  posts?: PostI[],
  saved?: PostI[],
  followers?: UserI[],
  followedByCurrentUser?: boolean,
  followings?: UserI[]
}

export interface IUser {
  _id?: string,
  name?: string,
  username?: string,
  email?: string,
  password?: string,
  profilePic?: string,
  bio?: string | null,
  posts?: IPost[],
  saved?: IPost[],
  followers?: string[],
  followedByCurrentUser?: boolean,
  followings?: string[]
}