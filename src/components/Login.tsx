"use client"
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { Login } from "@/actions/login"

interface LoginState {
  notExist: string | null;
  incorrectCredentials: string | null;
  success: boolean;
}

const initialState: LoginState = {
  notExist: null,
  incorrectCredentials: null,
  success: null
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [state, formAction, pending] = useActionState(Login, initialState)

  return (
    <Card className="w-10/10 h-10/10 md:w-6/10 md:h-9/10 lg:w-1/3">
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <h1 className="text-center text-2xl mb-1">Login</h1>
        </div>

        <hr className="mb-2" />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            name="username" id="username" type="text" placeholder="username"
            required
            />
          {state?.notExist && <p className=" text-red-500">{state.notExist}</p>}
        </div>

        <div>
          <div className=" block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput name="password" id="password1" placeholder="password"
            type={showPassword ? "text" : "password"}
            required />
          {state?.incorrectCredentials && <p className=" text-red-500">{state.incorrectCredentials}</p>}

        </div>
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">
            <Checkbox id="remember" checked={showPassword} onChange={() => setShowPassword(prev => !prev)} className="cursor-pointer" />
            <Label htmlFor="remember">Show password</Label>
          </div>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Processing..." : "Submit"}
        </Button>
        <p>Don&apos;t have an account yet? {" "} <Link className="underline px-1 text-blue-500 font-semibold" href="/signup">SignUp</Link> </p>
      </form>
    </Card>
  );
}
