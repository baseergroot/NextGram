import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"


const loggedInUser = async () => {
  const cookie = await cookies()
    const token = cookie.get("token")
    if (!token) {
      console.log("you are not loggen in")
    }

    const decode = verify(token.value, process.env.JWT_SECRET)
    console.log({decode})

    return decode
}

export default loggedInUser