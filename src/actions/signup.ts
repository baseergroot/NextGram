"use server"
import User from "@/models/UserModel";
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import ConnectDB from "@/lib/ConnectDb";
import { genSalt, hash } from 'bcrypt'

await ConnectDB()
export async function SignUp(data: {name: string, username: string,email: string, password: string}) {
  const {name, username, email, password} = data
  const cookie = await cookies()
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const existenceUser = await (User as any).findOne({username})
  if (existenceUser) {
    console.log("user already exist");
    return {success: false, userExistMessage: "User  Already Exist"}
  }
  const user = await (User as any).create({name, username, email, password: hashedPassword})
  const token = sign({name, username, email, id: user?._id}, process.env.JWT_SECRET)
  cookie.set("token", token, {
    httpOnly: true
  })
  console.log("signed in");
  return {success: true}

}
