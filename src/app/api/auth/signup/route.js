import User from "@/models/UserModel";
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import ConnectDB from "@/lib/ConnectDb";
import { genSalt, hash } from 'bcrypt';

export async function POST(req) {
  // const {name, username, email, password} = await req.json()
  // console.log("route:", {name, username, email});
  
  // const cookie = await cookies()
  // const salt = await genSalt(10);
  // const hashedPassword = await hash(password, salt);

  // await ConnectDB()


  // const existenceUser = await User.findOne({username})
  // if (existenceUser) {
  //   console.log("user already exist");
  //   return NextResponse.json({success: false, userExistMessage: "User  Already Exist"})
  // }

  // const user = await User.create({name, username, email, password: hashedPassword})
  // console.log({user})

  // const token = sign({name, username, email, id: user?._id}, process.env.JWT_SECRET)
  // cookie.set("token", token, {
  //   httpOnly: true
  // })
  // console.log("signed in");
  return NextResponse.json({success: true, message: "No More Using api routes"})
}
