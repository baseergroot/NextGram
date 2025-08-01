"use client";
import { CreatePost } from "@/actions/createPost";
import BottomNavbar from "@/components/BottomNavbar";
import axios from "axios";
import { Button, FileInput, Label, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Create() {
  const router = useRouter()
  const [success, setSuccess] = useState<boolean>(false)
  const [file, setFile] = useState<string>(null)
  const handleAction = async (form: FormData) => {
    const formData = new FormData();
    formData.append("file", form.get("file"));
    formData.append("upload_preset", "nextgram");

      const data: { title: string, file: string } = {
        title: form.get("title") as string,
        file
      }

      const response: { success: boolean } = await CreatePost(data)
      if (!response.success) {
        console.log("something went wrong")
        return
      }
      console.log({ response })
      setSuccess(true)
      router.push("/user/profile")

  };
  return (
    <>
      <h1 className="text-center py-10 text-xl font-semibold">New Post</h1>
      <form action={handleAction} className="flex flex-col items-center gap-7">
        <div className="flex w-9/10 items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className={"flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"}
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Add a photo or video</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                upload a post to share with your follower
              </p>
              <span className="px-4 py-1 bg-gray-200 rounded mt-3">Upload</span>
            </div>

            <FileInput aria-required id="dropzone-file" className="hidden" name="file" required onChange={ async e => {
              const formData = new FormData();
              formData.append("file", e.target.files[0]);
              formData.append("upload_preset", "nextgram");
              console.log("file type", e.target.files[0].type);
              const cloudnaryUrl: string = e.target.files[0].type.startsWith("image/") ? process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL : 
                e.target.files[0].type.startsWith("video/") ? process.env.NEXT_PUBLIC_CLOUDNARY_VIDEO_URL : null
              console.log("cloudnary url", cloudnaryUrl);
              if (cloudnaryUrl) {
                axios.post(
                cloudnaryUrl,
                formData
              ).then(res => {
                setFile(res.data.secure_url)
                console.log("file uploaded successfully", res.data.secure_url);
              })
                .catch(err => console.log("error agaya lamandu, ziyada cool ban rahe the na sub kuch tek tha:", err.message))
              }
              else console.log("cloudnary url not set, check your environment variables");
            }} />

          </Label>
        </div>
        <div className="w-9/10">
          <div className="mb-2 block">
            <Label htmlFor="comment">Title & Description</Label>
          </div>
          <Textarea
            id="comment"
            placeholder="Your thoughts..."
            required
            rows={4}
            name="title"
            aria-required
          />
        </div>
        <Button
          className="  font-semibold px-10"
          type="submit"
          disabled={!file}
        >
          {success ? "redirecting..." : "Post"}
        </Button>
      </form>
      <BottomNavbar />
    </>
  );
}
