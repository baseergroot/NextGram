import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // jwt is not working in edge run time

export async function middleware(request: NextRequest) {
  const token:string = request.cookies.get("token")?.value
  const currentPathName:string = request.nextUrl.pathname
  const authRoutes:string[] = ["/login", "/signup"]
  const protectedRoutes:string[] = ["/feed", "/search", "/post/create", "/post/[postid]", "/user/profile", "/user/profile/edit", "/user/save", "/user/[username]"]
  let isLoggedIn:boolean = false

  if (token) {
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const result = await jwtVerify(token, key)
    isLoggedIn = !!result
  }

  if (protectedRoutes.includes(currentPathName) && !token) {
    return NextResponse.redirect(new URL("/signup", request.url))
  }

  if (authRoutes.includes(currentPathName) && token) {
    return NextResponse.redirect(new URL("/feed", request.url))
  }

  return NextResponse.next()
}
