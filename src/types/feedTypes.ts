import { Decode } from "@/helpers/getLoggedInUser";
import { IPost } from "./PostType";

export type FeedProps = {
  posts: IPost[];
  decode: Decode;
};