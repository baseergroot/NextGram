import { Types } from "mongoose";
import { CommentI } from "./CommentType";
import { UserI } from "./UserType";

export interface PostI {
  _id?: Types.ObjectId | string;
  title?: string;
  file?: string;
  createdBy?: UserI;
  likes?: UserI[] | string[];
  comments?: CommentI[] | string[];
  saved?: UserI[] | string[];
}

