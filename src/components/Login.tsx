"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Login } from "@/actions/login";

interface LoginState {
  notExist: string | null;
  incorrectCredentials: string | null;
  success: boolean;
}

const initialState: LoginState = {
  notExist: null,
  incorrectCredentials: null,
  success: null,
};

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [state, formAction, pending] = useActionState(Login, initialState);

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-white/90 p-8 shadow-sm">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Welcome back
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick up where you left off.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        <div>
          <label htmlFor="username" className="text-xs font-semibold uppercase tracking-wide">
            Username
          </label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="yourname"
            required
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          {state?.notExist && (
            <p className="mt-2 text-xs text-red-600">{state.notExist}</p>
          )}
        </div>

        <div>
          <label htmlFor="password1" className="text-xs font-semibold uppercase tracking-wide">
            Password
          </label>
          <input
            name="password"
            id="password1"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            required
            className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm transition focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
          />
          {state?.incorrectCredentials && (
            <p className="mt-2 text-xs text-red-600">
              {state.incorrectCredentials}
            </p>
          )}
        </div>

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

        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Signing in..." : "Sign in"}
        </button>

        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link className="font-semibold text-foreground underline" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
