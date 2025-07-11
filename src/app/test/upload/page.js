"use client"

import axios from 'axios';
import { useState } from 'react';

export default function CreatePost() {

  const  Submit = async e => {
    const file = e.get("file")
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nextgram")
    console.log("formdata: ", formData)

    const res = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL,
      formData
    );
    const imageUrl = res.data.secure_url;
    console.log("Uploaded Image URL:", imageUrl);
    // axios.post("/api/test/create", formData).then(res => console.log(res.data))
   
  }
  return (
    <div>
      <form action={Submit}>
        <input type="file" name="file" />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
