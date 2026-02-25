import Image from "next/image";
import { FaComment } from "react-icons/fa";
import LikeButton from "./LikeButton";
import Link from "next/link";
import SaveButton from "@/components/SaveButton";
import loggedInUser from "@/lib/getLoggedInUser";

export default async function Feed({ posts }) {
  const decode = await loggedInUser();
  const currentUser: string = decode.id.toString();

  return (
    <section className="flex-1 bg-[#f3f4f6]">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pb-24 pt-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm"
          >
            <header className="flex items-center justify-between px-5 py-4">
              <Link
                href={`/user/${post.createdBy.username}`}
                className="flex items-center gap-3"
              >
                <Image
                  unoptimized
                  src={post.createdBy.profilePic}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-border object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {post.createdBy.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{post.createdBy.username}
                  </p>
                </div>
              </Link>
              <Link
                href={`/post/${post._id}`}
                className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                View
              </Link>
            </header>

            <div className="border-y border-border bg-[#e9ecef]">
              <div className="relative w-full overflow-hidden bg-[#e9ecef]">
                {post.file.endsWith(".mp4") ? (
                  <video
                    controls
                    src={post.file}
                    className="aspect-[1/1] w-full max-h-[520px] object-contain md:aspect-[4/5]"
                  />
                ) : (
                  <Link href={`/post/${post._id}`}>
                    <Image
                      unoptimized
                      src={post.file}
                      alt="Post"
                      width={900}
                      height={900}
                      className="aspect-[1/1] w-full max-h-[520px] object-contain md:aspect-[4/5]"
                    />
                  </Link>
                )}
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="text-sm text-foreground md:text-base">{post.title}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <LikeButton post={post} currentUser={currentUser} />
                  <Link
                    href={`/post/${post._id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    <FaComment className="h-4 w-4" />
                    <span className="tabular-nums">{post.comments.length}</span>
                  </Link>
                </div>
                <SaveButton post={post} currentUser={currentUser} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
