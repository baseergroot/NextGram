// /feed route, component

import Image from "next/image";
// import { IoMdHeart } from "react-icons/io";
import {FaComment} from "react-icons/fa";
// import {BiSolidSave} from "react-icons/bi";
import LikeButton from "./LikeButton";
import Link from "next/link";
import SaveButton from "@/components/SaveButton"

export default async function Feed({posts}) {
  return (
    <section className=" h-[100vh] w-full mb-10">
      <main className="bg-gray-100 h-full w-full overflow-auto">
        {
          posts.map((post) => (
            <div key={post._id} className="mx-2 p-2 bg-white rounded-xl shadow-md my-2 h-7/10 flex flex-col">
              {/* author information section */}
               <section className=" h-3/20 flex items-center gap-5 px-2">
                <Image src={post.createdBy.profilePic} alt="Post pic" width={10} height={10} className="rounded-full w-15 h-15" />
                <div className="">
                  <h2 className="text-lg font-semibold">{post.createdBy.name}</h2>
                  <p className="text-sm text-gray-500">@{post.createdBy.username}</p>
                </div>
               </section>

               {/* post file section video or img */}
               <div className="h-7/10">
                <Image src={post.file} alt="Profile pic" width={10} height={10} className=" h-full w-full bg-gray-100 object-contain" />
               </div>

               {/* post info section. post title, likes, comments, saves */}
               <section className="h-3/20 flex flex-col justify-center px-2">
                <h2 className="text-md">{post.title}</h2>
                <div className="text-sm text-gray-500 flex gap-7">
                  <LikeButton post={post} />
                  {/* <button className="flex gap-1 items-center text-xl"><IoMdHeart  className="text-2xl"/><span>{post.likes.length}</span></button> */}
                  <span className="flex gap-1 items-center text-xl">
                    <Link href={`/post/${post._id}`}>
                      <FaComment className="text-2xl"/>
                    </Link> 
                    <span>{post.comments.length}</span>
                  </span>
                  <SaveButton post={post} />
                  {/* <button className="flex gap-1 items-center text-xl"> <BiSolidSave className="text-2xl"/> <span>{post.saved.length}</span></button> */}
                </div>
               </section>
            </div>
          ))
        }
      </main>
    </section>
  )
}