import { Types } from "mongoose";
import { PostI } from "./PostType";

export interface UserI {
  _id?: Types.ObjectId | string,
  name?: string,
  username?: string,
  email?: string,
  password?: string,
  profilePic?: string,
  bio?: string | null,
  posts?: PostI[] | string[],
  saved?: PostI[] | string[],
  followers?: UserI[] | string[],
  followedByCurrentUser?: boolean,
  followings?: UserI[] | string[],
}
