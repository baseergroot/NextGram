"use server"

import ConnectDB from "@/lib/ConnectDb"
import User from "@/models/UserModel"
import { cookies } from "next/headers"
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken"
import { UserI } from "@/types/UserType";

await ConnectDB()
export async function Login(data: any ) {
  const {username, password} = data
  const cookie = await cookies()
  const user:UserI = await (User as any).findOne({username})
  if(!user) {
      console.log("user didn't exist")
      return {succcess: false, ErrorMessage: "username or password are incorrect"}
  }
  const isCorrectPassword = await compare(password, user.password)
  if(!isCorrectPassword) {
  console.log("incorrect password")
  return {success: false, ErrorMessage: "username or password are incorrect"}
  }
  const token = sign({name: user?.name, username, email: user?.email, id: user?._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
  cookie.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 // for 30 days
  })
  console.log("logged in");
  return {success: true}

}
