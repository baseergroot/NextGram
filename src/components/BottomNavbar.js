"use client";

import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/feed", label: "Feed", icon: GoHomeFill },
  { href: "/search", label: "Search", icon: IoSearch },
  { href: "/post/create", label: "Create", icon: IoMdAdd, isAction: true },
  { href: "/user/save", label: "Saved", icon: AiOutlineSave },
  { href: "/user/profile", label: "Profile", icon: CgProfile },
];

const BottomNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/90 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          if (item.isAction) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label="Create post"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg shadow-black/10"
              >
                <Icon className="h-6 w-6" />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
