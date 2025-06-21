import { Post } from "./userDetailsPost";

export interface UserDetails {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  posts: Post[];
  saved: string[]; // assuming these are IDs
  followers: string[]; // assuming these are user IDs
  followings: string[]; // same
  followedByCurrentUser: boolean;
  __v: number;
}
