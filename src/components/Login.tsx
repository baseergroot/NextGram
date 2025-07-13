"use client"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Login } from "@/actions/login"

export function LoginForm() {
  const router = useRouter()
  const [authError, setAuthError] = useState(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const Submit = async (e: FormData) => {
    setSuccess(true)
    const Logindata = {
      username: e.get("username"),
      password: e.get("password")
    }
    const response = await Login(Logindata)
    console.log({response})
    if (response.success) {
      setSuccess(true)
      // router.push("/feed")
    } else {
      setAuthError(response.ErrorMessage)
      setSuccess(false)
    }
  }

  return (
    <Card className="w-10/10 h-10/10 lg:w-1/3 lg:h-9/10">
      <form action={Submit} className="flex flex-col gap-4">
        <div>
          <h1 className="text-center text-2xl mb-1">Login</h1>
        </div>

        <hr className="mb-2" />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput name="username" id="username" type="text" placeholder="username" required />
        </div>

        <div>
          <div className=" block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput name="password" id="password1" type={showPassword ? "text" : "password"} placeholder="password" required />
          
        </div>
        <div className="flex justify-between items-center">
          {authError && <p className=" text-red-500">{authError}</p>}
          <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={showPassword} onChange={() => setShowPassword(prev => !prev)}/>
          <Label htmlFor="remember">Show password</Label>
        </div>
        </div>
        
        
        <Button type="submit" disabled={success}>{success ? "Redirecting..." : "Submit"}</Button>
        <p>Don&apos;t have an account yet? {" "} <Link className="underline px-1 text-blue-500 font-semibold" href="/signup">SignUp</Link> </p>
      </form>
    </Card>
  );
}
