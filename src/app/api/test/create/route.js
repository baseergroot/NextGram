import { NextResponse } from "next/server"
import path from "path"
import fs from 'fs/promises';
import {v2 as cloudnary} from "cloudinary"

cloudnary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
   const formData = await req.formData();
  const file = formData.get('file');
  const name = formData.get("name")
  const username = formData.get("username")

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  console.log(file, name, username)
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // console.log("bytes: ", bytes)
  // console.log("buffer: ", buffer)
  const cloudForm = new FormData()
  cloudForm.append("file", buffer, file.name)
  cloudForm.append("upload_preset", "nextgram")

  const res = axios.post(
      process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL,
      formData
    )

  console.log(res.data.secure_url)

  return NextResponse.json({ message: 'File uploaded', url: result.secure_url});
}