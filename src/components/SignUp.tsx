"use client";
import { SignUp } from "@/actions/signup";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgLayoutGrid } from "react-icons/cg";

export function SignupForm() {
  const router = useRouter()
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const passwordLengthCheck = (e) => {
    setError({
      ...error,
      passwordError:
        e.target.value.length < 6
          ? "Password's too short, must be atleast 6 characters"
          : null,
    });
  };

  const Submit = async (e) => {
    const SignUpData = {
      name: e.get("name"),
      username: e.get("username"),
      email: e.get("email"),
      password: e.get("password"),
    };

    const response = await SignUp(SignUpData)
    console.log({ response })
    if (response.success) {
      console.log("signed up");
      setSuccess(true)
      router.push("/feed")
    } else {
      console.log(response.userExistMessage)
      setError({
        ...error,
        userExistMessage: response.userExistMessage,
      });
    }
  };
  return (
    <Card className="w-10/10 h-10/10 md:w-6/10 md:h-9/10 lg:w-1/3">
      <h1 className="text-center text-2xl mb-1">Sign up</h1>
      <hr className="mb-2" />
      <form action={Submit} className="flex flex-col gap-4">
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
          {error.userExistMessage && (
            <p className="text-red-500">user already exist</p>
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
                <Checkbox id="remember" checked={showPassword} onChange={() => setShowPassword(prev => !prev)} />
                <Label htmlFor="remember">Show password</Label>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={success}>{
          success ? "redirecting..." : "Signup"
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