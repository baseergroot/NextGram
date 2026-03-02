import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"
import { ObjectId } from "mongoose"

export interface Decode {
    name?: string
    username?: string
    email?: string | null
    profilePic?: string
    id?: string | ObjectId
    success?: boolean
    message?: string
}

const loggedInUser = async ():Promise<Decode> => {
  const cookie = await cookies()
    const token = cookie.get("token")
    if (!token) {
      console.log("user are not loggen in")
      // redirect("/login")
      return {
        success: false,
        message: "user not logged in"
      }
    }

    const decode = verify(token.value, process.env.JWT_SECRET) as  Decode
    decode.success = true
    console.log({decode})

    return decode
}

export default loggedInUser