'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function UploadButton({ onUpload }) {
  return (
    <CldUploadWidget
      uploadPreset="nextgram"
      options={{
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, // optional if already set globally
  }}
      onUpload={result => {
        onUpload(result.info.secure_url);
      }}
    >
      {({ open }) => (
        <button onClick={() => open()} className="bg-blue-500 text-white p-2 rounded">
          Upload Image or Video
        </button>
      )}
    </CldUploadWidget>
  );
}
