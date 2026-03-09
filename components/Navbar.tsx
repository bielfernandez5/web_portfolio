"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItem = (href: string, label: string) => {
    const isActive =
      pathname === href ||
      (href !== "/" && pathname.startsWith(href));

    return (
      <Link
        href={href}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition
        ${
          isActive
            ? "bg-neutral-900 text-white"
            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-900"
        >
          Biel Fernandez
        </Link>

        <nav className="flex items-center gap-3">
          {navItem("/", "Home")}
          {navItem("/proyectos", "Projects")}
          {navItem("/sobre", "About")}
        </nav>
      </div>
    </header>
  );
}