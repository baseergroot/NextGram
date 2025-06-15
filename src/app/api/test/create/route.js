import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
   const formData = await req.formData(); // ✅ This is correct
  const file = formData.get("file");
  console.log("route: ", file)

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64String = `data:${file.type};base64,${buffer.toString("base64")}`;

    try {
    const uploadRes = await cloudinary.uploader.upload(base64String, {
      folder: "nextgram", // optional folder
    });

    return NextResponse.json({ success: true, url: uploadRes.secure_url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}