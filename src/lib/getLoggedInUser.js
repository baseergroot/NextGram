import { cookies } from "next/headers"
import { verify } from "jsonwebtoken"


const loggedInUser = async () => {
  const cookie = await cookies()
    const token = cookie.get("token").value
    const decode = verify(token, process.env.JWT_SECRET)
    console.log({decode})

    return decode
}

export default loggedInUser