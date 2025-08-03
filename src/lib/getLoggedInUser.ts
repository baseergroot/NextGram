"use server"
import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"

export interface Decode {
    name: string,
    username: string,
    email: string,
    id: string
}

const loggedInUser = async ():Promise<Decode> => {
  const cookie = await cookies()
    const token = cookie.get("token")
    if (!token) {
      console.log("you are not loggen in")
    }

    const decode = verify(token.value, process.env.JWT_SECRET)
    // console.log({decode})

    return decode
}

export default loggedInUser