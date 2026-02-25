"use client";

import NavbarComponent from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserI } from "@/types/UserType";
import { useRouter } from "next/navigation";
import BottomNavbar from "@/components/BottomNavbar";
import { PostI } from "@/types/PostType";
import { FollowAction } from "@/actions/follow";

export default function UserComponent({ userDetail, posts, following }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [user, setUser] = useState<UserI>();
  const [followers, setFollowers] = useState<number>(userDetail?.followers.length);
  const [isFollowing, setIsFollowing] = useState<boolean>(following);

  useEffect(() => {
    userDetail ? setUser(userDetail) : console.log("something went wrong");
  }, []);

  const stats: { number: number; label: string }[] = [
    { number: posts.length, label: "Posts" },
    { number: followers, label: "Followers" },
    { number: user?.followings?.length || 0, label: "Following" },
  ];

  const handleFollow = async () => {
    const response = await FollowAction(userDetail._id);
    if (response.success) {
      setIsFollowing((prev) => !prev);
      setFollowers(response.userFollowers.length);
    }
  };

  return (
    <div className="min-h-screen">
      <NavbarComponent profilePic={user?.profilePic} />

      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
        <section className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 overflow-hidden rounded-full border border-border">
                <Image
                  src={!user?.profilePic ? "/defaultProfile.png" : user?.profilePic}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">@{user?.username}</p>
                {user?.bio && (
                  <p className="mt-1 text-sm text-muted-foreground">{user.bio}</p>
                )}
              </div>
            </div>
            <button
              className={`rounded-full px-6 py-3 text-xs font-semibold shadow-sm transition hover:shadow ${
                isFollowing
                  ? "border border-border bg-white text-foreground"
                  : "bg-foreground text-background"
              }`}
              onClick={handleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-white px-4 py-3 text-center shadow-sm"
              >
                <span className="block text-lg font-semibold text-foreground">
                  {stat.number}
                </span>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-center gap-6 border-b border-border pb-2 text-sm font-medium text-muted-foreground">
            {[
              { id: "posts", label: "Posts" },
              { id: "reels", label: "Reels" },
              { id: "saved", label: "Saved" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`pb-2 transition-colors ${
                  activeTab === tab.id ? "text-foreground" : "hover:text-foreground"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {!posts ? (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              posts?.map((item: PostI) => (
                <div
                  key={item._id as string}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted/40"
                  onClick={() => router.push(`/post/${item._id}`)}
                >
                  <Image
                    src={item.file}
                    alt="post"
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      <BottomNavbar />
    </div>
  );
}
