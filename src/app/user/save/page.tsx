"use client";

import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import BottomNavbar from "@/components/BottomNavbar";
import NavbarComponent from "@/components/Navbar";
import { Saved } from "@/actions/savedPosts";
import Image from "next/image";

export default function SavedPostsPage() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savesLength, setSaveLength] = useState();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      setLoading(true);
      await Saved()
        .then((response) => {
          if (response.success) {
            setSavedPosts(response.user.saved);
          }
        })
        .catch(() => {
          setError("Failed to load saved posts");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchSavedPosts();
  }, [savesLength]);

  const handlePostClick = (postId) => {
    axios.post("/api/post/save", { postId: postId.toString() }).then((res) => {
      setSaveLength(res.data.savedByLength);
    });
  };

  const getImageUrl = (file) => {
    if (file.startsWith("http://") || file.startsWith("https://")) {
      return file;
    }
    return file.startsWith("/") ? file : `/${file}`;
  };

  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
        <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-foreground">Saved posts</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep track of posts you want to revisit.
          </p>
        </div>

        {loading && (
          <div className="mt-8 rounded-3xl border border-border bg-white/80 p-8 text-center text-sm text-muted-foreground shadow-sm">
            Loading saved posts...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-3xl border border-border bg-white/80 p-8 text-center text-sm text-red-600 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8">
            {savedPosts.length === 0 ? (
              <div className="rounded-3xl border border-border bg-white/80 p-8 text-center text-sm text-muted-foreground shadow-sm">
                No saved posts yet. Save posts to view them here.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {savedPosts.map((post) => (
                  <Fragment key={post._id as string}>
                    <button
                      type="button"
                      onClick={() => handlePostClick(post._id)}
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted/40"
                    >
                      <Image
                        src={getImageUrl(post.file)}
                        alt="Saved post"
                        width={300}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                    </button>
                  </Fragment>
                ))}
              </div>
            )}

            {savedPosts.length > 0 && (
              <p className="mt-6 text-sm text-muted-foreground">
                {savedPosts.length} saved posts
              </p>
            )}
          </div>
        )}
      </main>
      <BottomNavbar />
    </div>
  );
}
