"use client";

import { CreatePost } from "@/actions/createPost";
import BottomNavbar from "@/components/BottomNavbar";
import NavbarComponent from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [file, setFile] = useState<string>(null);

  const handleAction = async (form: FormData) => {
    const formData = new FormData();
    formData.append("file", form.get("file"));
    formData.append("upload_preset", "nextgram");

    const data: { title: string; file: string } = {
      title: form.get("title") as string,
      file,
    };

    const response: { success: boolean } = await CreatePost(data);
    if (!response.success) {
      return;
    }
    setSuccess(true);
    router.push("/user/profile");
  };

  return (
    <div className="min-h-screen">
      <NavbarComponent />
      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-10">
        <div className="rounded-3xl border border-border bg-white/90 p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              New post
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-foreground">Share a moment</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Upload a photo or video and add a short caption.
            </p>
          </div>

          <form action={handleAction} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center transition hover:bg-muted/50"
              >
                <div className="text-sm font-semibold text-foreground">
                  Add a photo or video
                </div>
                <p className="text-xs text-muted-foreground">
                  Drag and drop or click to upload
                </p>
                <span className="rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground">
                  Choose file
                </span>
                <input
                  aria-required
                  id="dropzone-file"
                  className="hidden"
                  name="file"
                  required
                  type="file"
                  onChange={async (e) => {
                    const formData = new FormData();
                    formData.append("file", e.target.files[0]);
                    formData.append("upload_preset", "nextgram");
                    const cloudnaryUrl: string = e.target.files[0].type.startsWith("image/")
                      ? process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL
                      : e.target.files[0].type.startsWith("video/")
                      ? process.env.NEXT_PUBLIC_CLOUDNARY_VIDEO_URL
                      : null;
                    if (cloudnaryUrl) {
                      axios
                        .post(cloudnaryUrl, formData)
                        .then((res) => {
                          setFile(res.data.secure_url);
                        })
                        .catch((err) =>
                          console.log(
                            "upload error:",
                            err.message
                          )
                        );
                    }
                  }}
                />
              </label>
              {file && (
                <p className="mt-3 text-xs text-muted-foreground">Upload complete.</p>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="text-xs font-semibold uppercase tracking-wide">
                Title & Description
              </label>
              <textarea
                id="comment"
                placeholder="Your thoughts..."
                required
                rows={4}
                name="title"
                aria-required
                className="mt-2 w-full rounded-2xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <button
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={!file}
            >
              {success ? "Redirecting..." : "Publish post"}
            </button>
          </form>
        </div>
      </main>
      <BottomNavbar />
    </div>
  );
}
