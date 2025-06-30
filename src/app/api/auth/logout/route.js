import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";


export async function GET(request) {
  const cookie = await cookies()
  cookie.delete("token")
  return redirect("/")
}