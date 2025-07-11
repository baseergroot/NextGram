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
  const [error, setError] = useState< any >({});
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
      // router.push("/profile")
    } else {
      console.log(response.userExistMessage)
      setError({
        ...error,
        userExistMessage: response.userExistMessage,
      });
    }
  };
  return (
    <Card className="w-9/10 h-9/10 lg:w-1/3">
      <h1 className="text-center text-2xl mb-1">SignUp</h1>
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
            <Label htmlFor="email1">Recovery Email</Label>
          </div>
          <TextInput
            name="email"
            id="email1"
            type="email"
            placeholder="email@flowbite.com (optional)"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput
            name="password"
            id="password1"
            type="password"
            placeholder="password"
            required
            onChange={passwordLengthCheck}
          />
          {error.passwordError && (
            <p className="text-red-500">{error.passwordError}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* <Checkbox id="remember" /> */}
          {/* <Label htmlFor="remember">Remember me</Label> */}
        </div>
        <Button type="submit" disabled={success}>{
            success ? "redirecting..." : "Signup"
          }</Button>
        <p>
          Already have an account?{" "}
          <Link className="underline px-1 text-blue-500" href="/login">
            Login
          </Link>
        </p>
      </form>
    </Card>
  );
}