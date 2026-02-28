"use server"
import User from "@/models/UserModel";
import { cookies } from "next/headers"
import { sign } from "jsonwebtoken"
import ConnectDB from "@/lib/ConnectDb";
import { genSalt, hash } from 'bcrypt'
import { z } from "zod";
import { redirect } from "next/navigation";

const SignUpSchema = z.object({
  name: z.string()
  .min(4, "Name is too short, should be atleast 4 characters")
  .max(15, "Name is too long, no more than 15 characters"),
  username: z.string()
  .min(4, "Username is too short, should be atleast 4 characters")
  .max(15, "Username is too long, no more than 15 characters")
  .regex(/^[a-z0-9._]{4,15}$/, "Username can only contain lowercase letters, numbers, dots, and underscores"),
})

await ConnectDB()
export async function SignUp(intitialData: any, formData: FormData) {
  const { name, username, password } = {
    name: formData.get("name")?.toString(),
    username: formData.get("username")?.toString(),
    password: formData.get("password")?.toString(),
  }
  const validateUser = SignUpSchema.safeParse({
    name, username
  })
  if (!validateUser.success) {
    const errors: Record<string, string> = {}
    validateUser.error.issues.forEach(issue => {
      const fieldName: string = String(issue.path[0])
      errors[fieldName] = issue.message
    })
    return {
      success: false,
      errors
    }
  }
  const cookie = await cookies()
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  const existenceUser = await (User as any).findOne({ username })
  if (existenceUser) {
    console.log("user already exist");
    return {
      success: false, userExist: `${username} already taken, try another username`
    }
  }
  const user = await (User as any).create({ name, username, password: hashedPassword })
  const token = sign({ name, username, id: user?._id }, process.env.JWT_SECRET)
  cookie.set("token", token, {
    httpOnly: true
  })
  console.log("signed in");
  return redirect("/feed")

}
