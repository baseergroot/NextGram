"use client";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { CloudUploadIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const Edit = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null)

  useEffect(() => {
    axios.get("/api/user/profile").then((res) => {
      setName(res.data.user.name);
      setUsername(res.data.user.username);
      setProfilePic(res.data.user.profilePic)
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("selectedFile:", selectedFile);
    const formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("upload_preset", "nextgram");
    console.log(formdata);
    axios
      .post(process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL, formdata)
      .then((res) => {
        console.log(res.data.secure_url);
        setProfilePic(res.data.secure_url)
        axios.patch("/api/user/profile/edit", {
          file: res.data.secure_url,
          name,
          username,
        });
      });
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
    <div>
      <form
        onSubmit={handleSubmit}
        className=" w-[90vw] flex flex-col gap-5 py-10 px-5 mx-[5vw] my-20 rounded shadow-2xl"
      >
        <h1 className="text-center text-2xl mb-5">Update Profile</h1>
        {/* <input type="file"
        onChange={event => setSelectedFile(event.target.files[0])} /> */}
        <div className="flex gap-5 items-center">
          {profilePic && <Image src={profilePic} alt="Profile pic" width={10} height={10}
          unoptimized
           className="rounded-full w-[100px] h-[100px] object-cover"></Image>}
          <div>
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
            onChange={(event) => setSelectedFile(event.target.files[0])}
            multiple
          />
        </Button>
          </div>
        </div>
        {/* <input type="text" value={name}  name='name' onChange={e => setName(e.target.value)}/> */}
        <TextField
          id="filled-basic"
          label="Your full name"
          variant="filled"
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        {/* <input type="text" value={username} name='username' onChange={e => setUsername(e.target.value)}/> */}
        <TextField
          id="filled-basic"
          label="Your username"
          variant="filled"
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <button type='submit'>Submit</button> */}
        <Button variant="contained" type="submit" className="">
          Update Profile
        </Button>
      </form>
    </div>
  );
};

export default Edit;
