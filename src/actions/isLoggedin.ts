"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"



export async function isLoggedinAction() {
  const cookie = await cookies()
  const token = cookie.get("token")
  if (token?.value) {
    const user = jwt.verify(token.value, process.env.JWT_SECRET)
    console.log("user is logged in");
    return user ? true : false
  }
  console.log("not logged in")
  return false
}