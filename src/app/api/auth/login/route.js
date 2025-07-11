import User from '@/models/UserModel';
import { compare } from 'bcrypt';
import { NextResponse } from 'next/server';
import { sign } from "jsonwebtoken"
import { cookies } from 'next/headers';
import ConnectDB from '@/lib/ConnectDb';

// export async function POST(req) {
  // await ConnectDB()
  // const {username, password} = await req.json()
  
  // const cookie = await cookies()
  // const user = await User.findOne({username})

  // if(!user) {
  //   console.log("user didn't exist")
  //   return NextResponse.json({succcess: false, ErrorMessage: "username or password are incorrect"})
  // }

  // const isCorrectPassword = await compare(password, user.password)
  // if(!isCorrectPassword) {
  //   console.log("incorrect password")
  //   return NextResponse.json({success: false, ErrorMessage: "username or password are incorrect"})
  // }
  // const token = sign({name: user?.name, username, email: user?.email, id: user?._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
  // cookie.set("token", token, {
  //   httpOnly: true,
  //   maxAge: 60 * 60 * 24 * 30
  // })
  // console.log("logged in");
  
  // return NextResponse.json({success: true})
// }
