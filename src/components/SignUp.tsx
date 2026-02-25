"use client";

import { SignUp } from "@/actions/signup";
import Link from "next/link";
import { useActionState, useState } from "react";
import { z } from "zod";

interface actionResponse {
  success?: boolean;
  userExist?: string;
  errors?: Record<string, string>;
}
const initialValue: actionResponse = {};

const passwordSchema = z
  .string()
  .min(6, "Password's too short, must be atleast 6 characters");

export function SignupForm() {
  const [error, setError] = useState<any>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [state, formAction, pending] = useActionState(SignUp, initialValue);

  const passwordLengthCheck = (e) => {
    const validatePassword = passwordSchema.safeParse(e.target.value);
    if (validatePassword.success) {
      return setError({
        ...error,
        passwordError: null,
      });
    }
    setError({
      ...error,
      passwordError: validatePassword.error.issues[0].message,
    });
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-white/90 p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Start sharing
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">Create account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It only takes a moment to join NextGram.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Your full name"
            required
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          {state?.errors?.name && (
            <p className="mt-2 text-xs text-red-600">{state.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="username" className="text-xs font-semibold uppercase tracking-wide">
            Username
          </label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="Choose a username"
            required
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          {state?.userExist && (
            <p className="mt-2 text-xs text-red-600">{state.userExist}</p>
          )}
          {state?.errors?.username && (
            <p className="mt-2 text-xs text-red-600">{state.errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="password1" className="text-xs font-semibold uppercase tracking-wide">
            Password
          </label>
          <input
            name="password"
            id="password1"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            onChange={passwordLengthCheck}
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          <div className="mt-2 flex items-center justify-between">
            {error.passwordError && (
              <p className="text-xs text-red-600">
                Password&apos;s too short. Must be atleast 6 characters.
              </p>
            )}
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input
                id="remember"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
              />
              Show password
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Creating..." : "Create account"}
        </button>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="font-semibold text-foreground underline" href="/login">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
