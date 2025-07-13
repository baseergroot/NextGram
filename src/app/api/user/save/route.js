import ConnectDB from "@/lib/ConnectDb";
import loggedInUser from "@/lib/getLoggedInUser";
import Post from "@/models/PostModel";
import User from "@/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const decode = await loggedInUser();
    await ConnectDB();

    const user = await User.findById(decode.id)
      .select("-password")
      .populate("saved", "file")
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

