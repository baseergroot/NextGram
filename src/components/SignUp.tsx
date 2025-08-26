"use client";
import { SignUp } from "@/actions/signup";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import {z} from "zod";

interface actionResponse {
  success?: boolean,
  userExist?: string,
  errors?: Record<string, string>
}
const initialValue: actionResponse = {}

const passwordSchema = z.string().min(6, "Password's too short, must be atleast 6 characters")

export function SignupForm() {
  const [error, setError] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [state, formAction, pending] = useActionState(SignUp, initialValue)

  const passwordLengthCheck = (e) => {
    const validatePassword = passwordSchema.safeParse(e.target.value)
    if (validatePassword.success) {
      return setError({
        ...error,
        passwordError: null,
      });
    }
    setError({
      ...error,
      passwordError: validatePassword.error.issues[0].message
    });
  };

  return (
    <Card className="w-10/10 h-10/10 md:w-6/10 md:h-9/10 lg:w-1/3">
      <h1 className="text-center text-2xl mb-1">Sign up</h1>
      <hr className="mb-2" />
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <TextInput
            name="name"
            id="name"
            type="text"
            placeholder="Name"
            required
          />
          {state?.errors?.name && (
            <p className="text-red-500">{state.errors.name}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <TextInput
            name="username"
            id="username"
            type="text"
            placeholder="username"
            required
          />
          {state?.userExist && (
            <p className="text-red-500">{state.userExist}</p>
          )}
          {state?.errors?.username && (
            <p className="text-red-500">{state.errors.username}</p>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput
            name="password"
            id="password1"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            required
            onChange={passwordLengthCheck}
          />
          <div className="flex flex-col justify-end">
            <div className="flex justify-between items-center pt-2">
              {error.passwordError && (
                <p className="text-red-500 text-[14px]">Password&apos;s too short <br /> Must be atleast 6 characters</p>
              )}
              <div className="flex items-center gap-2">
                <Checkbox id="remember" checked={showPassword}
                  onChange={() => setShowPassword(prev => !prev)}
                  className="cursor-pointer" />
                <Label htmlFor="remember">Show password</Label>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={pending}>{
          pending ? "Processing..." : "Signup"
        }</Button>
        <p>
          Already have an account?{" "}
          <Link className="underline px-1 text-blue-500 font-semibold" href="/login">
            Login
          </Link>
        </p>
      </form>
    </Card>
  );
}