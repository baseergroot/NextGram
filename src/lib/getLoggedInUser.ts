"use server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { redirect } from "next/navigation"
import { ObjectId } from "mongoose"

export interface Decode {
    name: string,
    username: string,
    email: string | null,
    id: string | ObjectId
}

const loggedInUser = async ():Promise<Decode> => {
  const cookie = await cookies()
    const token = cookie.get("token")
    if (!token) {
      console.log("user are not loggen in")
      redirect("/login")
    }

    const decode = verify(token.value, process.env.JWT_SECRET) as  Decode
    console.log({decode})

    return decode
}

export default loggedInUser