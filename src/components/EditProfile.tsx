"use client"
import { ProfileEdit } from '@/actions/profileEdit'
import { UserI } from '@/types/UserType'
import axios from 'axios'
import { Label, TextInput } from 'flowbite-react'
import { Button, styled, TextField } from "@mui/material";
import { CloudUploadIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const EditForm = ({ userDetail }) => {
  const [user, setUser] = useState<UserI>(userDetail)

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("upload_preset", "nextgram");
      const clResponse = await axios.post(process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL, formdata)
      setUser({ ...user, profilePic: clResponse.data.secure_url });
      console.log("updated profile pic:", clResponse.data.secure_url);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await ProfileEdit(user);
    console.log("Updated User:", user);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div className='w-full max-w-md mx-auto bg-white rounded-lg'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-1 py-10 my-10 px-5 shadow-2xl'>
        <div className='flex items-center gap-2 mb-4'>
          <div className="mb-2 flex flex-col items-center">
            <Label htmlFor="profilePic">Profile Picture</Label>
            <Image src={user.profilePic} alt='Profile Pic' width={30} height={30} className='rounded-full object-cover w-20 h-20 border-2 border-gray-300' unoptimized/>
          </div>
          {/* <input
            type="file"
            id="profilePic"
            onChange={handleFileChange}
          /> */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}

          >
            Upload pic
            <VisuallyHiddenInput
              type="file"
              id="profilePic"
              onChange={handleFileChange}
            />
          </Button>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <TextInput
            id="name"
            type="text"
            placeholder="Name"
            required
            onChange={e => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
        </div>
        <div></div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            id="username"
            type="text"
            placeholder="Username"
            required
            onChange={e => setUser({ ...user, username: e.target.value })}
            value={user.username}
          />
        </div>
        <div></div>
        <Button variant="contained" type="submit" className='mt-3'>Update Profile</Button>
      </form>
    </div>
  )
}

export default EditForm