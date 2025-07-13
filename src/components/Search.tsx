"use client";
import { Search } from "@/actions/search";
import { UserI } from "@/types/UserType";
import { TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResult] = useState<UserI[]>([])
  const inputHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value)
  }
  useEffect(() => {
    const timeOut = setTimeout( async () => {
      console.log("will run after 100ms", searchInput)
      const search = await Search(searchInput)
      if (search.success) {
        console.log("search", search)
        setSearchResult(search.users)
      }
    }, 300)
    return () => clearTimeout(timeOut)
  },[searchInput])

  return (
    <>
    <div className="flex w-full flex-col gap-4 px-10 py-5">
      <TextInput
        className=""
        id="email1"
        type="text"
        value={searchInput}
        placeholder="Search"
        required
        onChange={inputHandler}
      />
    </div>
    {
      searchResults.length > 0 && <section>
      {
        <ol className="flex flex-col gap-1.5 px-5">
          {searchResults.map((user:UserI, index) => (
            <Link key={index} href={`/user/${user.username}`}>
            <li  className=" flex gap-4 items-center">
              <Image src={!user?.profilePic ? "/defaultprofile" : user?.profilePic} alt='Profile image' width={40} height={40} className='w-[40px] h-[40px] rounded-full object-cover bg-gray-300'></Image>
                <div>
                  <p>{user?.username}</p>
                <p>{user?.name}</p>
                </div>
            </li>
            </Link>
          ))}
        </ol>
        
        
      }
    </section>
    }
    </>
  );
}
