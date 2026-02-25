"use client";

import { Search } from "@/actions/search";
import { UserI } from "@/types/UserType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchComponent() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResult] = useState<UserI[]>([]);

  const inputHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      const search = await Search(searchInput);
      if (search.success) {
        setSearchResult(search.users);
      }
    }, 300);
    return () => clearTimeout(timeOut);
  }, [searchInput]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-6">
      <div className="rounded-3xl border border-border bg-white/80 p-6 shadow-sm">
        <label htmlFor="search" className="text-xs font-semibold uppercase tracking-wide">
          Search people
        </label>
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2">
          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            id="search"
            type="text"
            value={searchInput}
            placeholder="Search by name or username"
            required
            onChange={inputHandler}
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {searchResults.length > 0 && (
        <section className="mt-6">
          <ol className="flex flex-col gap-3">
            {searchResults.map((user: UserI, index) => (
              <Link
                key={index}
                href={`/user/${user.username}`}
                className="rounded-2xl border border-border bg-white/80 px-4 py-3 shadow-sm transition hover:shadow-md"
              >
                <li className="flex items-center gap-4">
                  <Image
                    src={!user?.profilePic ? "/defaultProfile.png" : user?.profilePic}
                    alt="Profile"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">@{user?.username}</p>
                    <p className="text-xs text-muted-foreground">{user?.name}</p>
                  </div>
                </li>
              </Link>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
