"use client";

import { isLoggedinAction } from "@/actions/isLoggedin";
import { Logout } from "@/actions/logout";
import loggedInUser from "@/lib/getLoggedInUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/search", label: "Search" },
  { href: "/user/save", label: "Saved" },
  { href: "/user/profile", label: "Profile" },
];

const NavbarComponent = ({ profilePic }) => {
  const [isLoggedin, setIsloggedin] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      const response: boolean = await isLoggedinAction();
      response ? setIsloggedin(true) : setIsloggedin(false);
      const decode = await loggedInUser();
      setUser({ name: decode.name, username: decode.username });
    }
    fetchUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            NextGram
          </Link>
          <span className="hidden text-xs text-muted-foreground md:inline">
            Share moments, stay focused.
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/post/create"
            className="hidden items-center rounded-full border border-border bg-white px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:shadow md:inline-flex"
          >
            New post
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-border bg-white/80 md:p-1.5 md:pr-3 text-xs font-medium text-muted-foreground shadow-sm transition hover:text-foreground hover:shadow"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
            >
              <Image
                alt="User menu"
                src={!profilePic ? "/defaultProfile.png" : profilePic}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="hidden sm:inline">@{user ? user.username : "guest"}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-border bg-white/95 p-2 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-foreground">
                    {user ? user.name : "Loading..."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    @{user ? user.username : "loading"}
                  </p>
                </div>
                <div className="my-1 h-px bg-border" />
                <Link
                  href="/search"
                  className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                >
                  Search
                </Link>
                <Link
                  href="/user/profile"
                  className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                >
                  Profile
                </Link>
                <Link
                  href="/user/save"
                  className="block rounded-lg px-3 py-2 text-sm text-foreground transition hover:bg-muted"
                >
                  Saved
                </Link>
                <div className="my-1 h-px bg-border" />
                {isLoggedin ? (
                  <button
                    className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
                    onClick={async () => {
                      const response = await Logout();
                      if (response) {
                        setIsloggedin(false);
                        router.push("/");
                      }
                    }}
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    className="flex w-full rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
                    onClick={() => router.push("/login")}
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarComponent;
