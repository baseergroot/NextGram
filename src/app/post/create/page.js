"use client";
import axios from "axios";
import { Button, FileInput, Label, Textarea } from "flowbite-react";
import { useState } from "react";

export default function Create() {
  const [imageUploaded, setImageUploaded] = useState(null)
  const handleAction = async (form) => {
    const formData = new FormData();
    formData.append("file", form.get("file"));
    formData.append("upload_preset", "nextgram");

     axios.post(
      process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL,
      formData
    ).then( async res => {
    console.log(res.data)
    setImageUploaded(res.data.secure_url)
     await axios.post("/api/post/create", {title: form.get("title"), file: res.data.secure_url})
    })
    .catch(err => console.log({err}))

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
            <FileInput id="dropzone-file" className="hidden" name="file" required />
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
          />
        </div>
        <Button
          className="bg-black text-white font-semibold px-10"
          type="submit"
        >
          Post
        </Button>
      </form>
    </>
  );
}
