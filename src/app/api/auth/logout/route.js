import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const cookie = await cookies()
  cookie.delete("token")
  return redirect("/")
}
