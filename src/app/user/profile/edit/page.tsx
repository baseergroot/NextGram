import ConnectDB from "@/lib/ConnectDb";
import loggedInUser, { Decode } from "@/lib/getLoggedInUser";
import User from "@/models/UserModel";
import { UserI } from "@/types/UserType";
import Image from "next/image";

await ConnectDB()

export default async function Page() {
  const decode: Decode = await loggedInUser()
  const user:UserI = await (User as any).findById(decode.id).select("-password");
  console.log({user})
  return (
    <div>
      <h1>Under Development</h1>
    </div>
  )
}






























// "use client";
// import { Button, TextField } from "@mui/material";
// import axios from "axios";
// import { CloudUploadIcon } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
// import Image from "next/image";
// import { ProfileEdit } from "@/actions/profileEdit";
// import Profile from "@/actions/profile";

// const Edit = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [name, setName] = useState<string>(null);
//   const [username, setUsername] = useState<string>(null);
//   const [profilePic, setProfilePic] = useState(null)
//   const [success, setSuccess] = useState<boolean>(false)

//   useEffect(() => {
//     async function Fetch() {
//       const response = await Profile()
//       setName(response.user.name);
//       setUsername(response.user.username);
//       setProfilePic(response.user.profilePic)
//     }
//     Fetch()
//   }, []);

//   const handleSubmit = (event: any) => {
//     event.preventDefault();
//     console.log("selectedFile:", selectedFile);
//     // const formdata = new FormData();
//     // formdata.append("file", selectedFile);
//     // formdata.append("upload_preset", "nextgram");
//     // console.log(formdata);
//     // axios
//     //   .post(process.env.NEXT_PUBLIC_CLOUDNARY_IMAGE_URL, formdata)
//     //   .then( async (res) => {
//     //     console.log(res.data.secure_url);
//     //     setProfilePic(res.data.secure_url)
//     //     const data = {
//     //       file: res.data.secure_url,
//     //       name,
//     //       username,
//     //     }
//     //     const response = await ProfileEdit(data)
//     //     response.success ? setSuccess(true) : console.log("something went wrong")
//     //   });
//   };
//   const VisuallyHiddenInput = styled("input")({
//     clip: "rect(0 0 0 0)",
//     clipPath: "inset(50%)",
//     height: 1,
//     overflow: "hidden",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     whiteSpace: "nowrap",
//     width: 1,
//   });
//   return (
//     <div>
//       <form
//         onSubmit={handleSubmit}
//         className=" w-[90vw] flex flex-col gap-5 py-10 px-5 mx-[5vw] my-20 rounded shadow-2xl"
//       >
//         <h1 className="text-center text-2xl mb-5">Update Profile</h1>
//         <div className="flex gap-5 items-center">
//           {profilePic && <Image src={profilePic} alt="Profile pic" width={10} height={10}
//             unoptimized
//             className="rounded-full w-[100px] h-[100px] object-cover"></Image>}
//           <div>
//             <Button
//               component="label"
//               role={undefined}
//               variant="contained"
//               tabIndex={-1}
//               startIcon={<CloudUploadIcon />}

//             >
//               Upload pic
//               <VisuallyHiddenInput
//                 type="file"
//                 onChange={(event) => setSelectedFile(event.target.files[0])}
//                 multiple
//               />
//             </Button>
//           </div>
//         </div>
//         <TextField
//           id="filled-basic"
//           label="Your full name"
//           variant="filled"
//           type="text"
//           value={name}
//           name="name"
//           onChange={(e) => setName(e.target.value)}
//         />
//         <TextField
//           id="filled-basic"
//           label="Your username"
//           variant="filled"
//           type="text"
//           value={username}
//           name="username"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <Button variant="contained" type="submit" className="" disabled={success}>
//           Update Profile
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default Edit;
