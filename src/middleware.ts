import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // jwt is not working due to edge run time

export async function middleware(request: NextRequest) {
  const token:string = request?.cookies?.get("token")?.value
  const currentPathName:string = request.nextUrl.pathname
  const authRoutes:string[] = ["/login", "/signup"]
  const protectedRoutes:string[] = ["/feed", "/search", "/post/create", "post/[postid]", "/user/profile", "/user/save"]
  let isLoggedIn:boolean = false

  if (token) {
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const result = await jwtVerify(token, key)
    // console.log("result:", result.payload.name)
    isLoggedIn = result ? true : false
    // console.log(isLoggedIn)
  }

  if (protectedRoutes.includes(currentPathName) && !token) {
    // console.log("not logged in, plz log in first")
    return NextResponse.redirect(new URL("/signup", request.url))
  }

  if (authRoutes.includes(currentPathName) && token) {
    // console.log("already logged in redirecting to /")
    return NextResponse.redirect(new URL("/feed", request.url))
  }

  return NextResponse.next()
}
