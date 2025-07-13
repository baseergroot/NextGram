// import ConnectDB from "@/lib/ConnectDb";
// import loggedInUser from "@/lib/getLoggedInUser";
// import Post from "@/models/PostModel";
// import User from "@/models/UserModel";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const decode = await loggedInUser();
//   await ConnectDB();
//   const user = await User.findById(decode.id)
//     .select("-password")
//     .populate("posts", "file");
//   console.log({ user });
//   return NextResponse.json({ user });
// }
