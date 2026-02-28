"use server"

import ConnectDB from "@/lib/ConnectDb"
import User from "@/models/UserModel"
import { cookies } from "next/headers"
import { compare } from 'bcrypt';
import { sign } from "jsonwebtoken"
import { UserI } from "@/types/UserType";
import { redirect } from "next/navigation";

await ConnectDB()
export async function Login(initialState: any, formData: FormData ) {
  const {username, password} = {
    username: formData.get("username")?.toString(),
    password: formData.get("password")?.toString()
  }
  const cookie = await cookies()
  const user:UserI = await (User as any).findOne({username})
  if(!user) {
      console.log("user didn't exist")
      return {succcess: false, notExist: "username didn't exist"}
  }
  const isCorrectPassword = await compare(password, user.password)
  if(!isCorrectPassword) {
  console.log("incorrect password")
  return {success: false, incorrectCredentials: "username or password are incorrect"}
  }
  const token = sign({name: user?.name, username, email: user?.email, id: user?._id}, process.env.JWT_SECRET, {expiresIn: "30d"})
  cookie.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 // for 30 days
  })
  console.log("logged in");
  return redirect("/feed")

}
