import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(request) {
  const cookie = await cookies()
  cookie.delete("token")
  return NextResponse.redirect(new URL("/", request.url))
}