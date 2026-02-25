import ConnectDB from "@/lib/ConnectDb";
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import Comment from "@/models/CommentModel";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import NavbarComponent from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import LikeButton from "@/components/LikeButton";
import SaveButton from "@/components/SaveButton";

await ConnectDB();
const PostRoute = async ({ params }) => {
  const { postid } = await params;
  const decode = await loggedInUser();
  const currentUser: string = decode.id.toString();

  let post: any = await Post.findById(postid)
    .populate({ path: "createdBy", select: "name username profilePic" })
    .populate({
      path: "comments",
      select: "content createdBy likes",
      populate: {
        path: "createdBy",
        select: "name username profilePic",
      },
    });

  post = {
    _id: post._id.toString(),
    title: post.title,
    file: post.file,
    comments: post.comments
      .map((comment) => ({
        _id: comment._id.toString(),
        content: comment.content,
        createdBy: {
          name: comment.createdBy.name,
          username: comment.createdBy.username,
          profilePic: comment.createdBy.profilePic,
        },
        likes: comment.likes.map((_id) => _id.toString()),
      }))
      .reverse(),
    likes: post.likes.map((_id) => _id.toString()),
    saved: post.saved.map((_id) => _id.toString()),
    createdBy: {
      name: post.createdBy.name,
      username: post.createdBy.username,
      profilePic: post.createdBy.profilePic,
    },
  };

  const comments = post.comments;

  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8">
        <article className="overflow-hidden rounded-3xl border border-border bg-white/90 shadow-sm">
          <header className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3">
              <Image
                src={post.createdBy.profilePic}
                width={52}
                height={52}
                alt="Profile"
                className="h-12 w-12 rounded-full border border-border object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {post.createdBy.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  @{post.createdBy.username}
                </p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Just now</span>
          </header>

          <div className="border-y border-border bg-muted/30">
            {post.file.endsWith(".mp4") ? (
              <video controls src={post.file} className="w-full object-contain" />
            ) : (
              <Image
                src={post.file}
                width={900}
                height={700}
                alt="Post content"
                className="w-full object-contain"
              />
            )}
          </div>

          <div className="px-5 py-4">
            <p className="text-base font-medium text-foreground">{post.title}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <LikeButton post={post} currentUser={currentUser} />
                <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.7}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="tabular-nums">{post.comments?.length || 0}</span>
                </div>
              </div>
              <SaveButton post={post} currentUser={currentUser} />
            </div>
          </div>
        </article>

        <section className="mt-8 rounded-3xl border border-border bg-white/90 p-6 shadow-sm">
          <form
            action={async (form: FormData) => {
              "use server";
              await ConnectDB();
              const content = form.get("comment") as string;
              const comment = await (Comment as any).create({
                content,
                createdBy: decode.id,
                post: postid,
              });
              await (Post as any).findByIdAndUpdate(postid, {
                $push: { comments: comment._id },
              });
              revalidatePath(`/post/{postid}`);
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="comment"
                className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                Add a comment
              </label>
              <textarea
                id="comment"
                name="comment"
                placeholder="Share your thoughts..."
                className="mt-2 w-full rounded-2xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-sm transition hover:shadow"
              >
                Post comment
              </button>
            </div>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">
            Comments ({post.comments?.length || 0})
          </h2>

          <div className="mt-4 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-2xl border border-border bg-white/90 p-5 shadow-sm"
                >
                  <div className="flex gap-4">
                    <Image
                      src={comment.createdBy.profilePic || "/defaultProfile.png"}
                      width={44}
                      height={44}
                      alt="Commenter profile"
                      className="h-11 w-11 rounded-full border border-border object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">
                          {comment.createdBy.username || "guest"}
                        </span>
                        <span>•</span>
                        <span>Just now</span>
                      </div>
                      <p className="mt-2 text-sm text-foreground">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-border bg-white/80 p-8 text-center text-sm text-muted-foreground">
                No comments yet. Be the first to share your thoughts.
              </div>
            )}
          </div>
        </section>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default PostRoute;
