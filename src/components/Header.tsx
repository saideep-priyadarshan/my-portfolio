"use client";

import { useRef } from "react";
import Link from "next/link";
// import ChatToggle from "./ChatToggle";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Skills",
    href: "#skills",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Blog",
    href: "#blog",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  headerRef: React.RefObject<HTMLElement>,
) {
  if (href === "/") {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  if (href.startsWith("#")) {
    e.preventDefault();
    const el = document.getElementById(href.slice(1));
    if (el) {
      if (href === "#projects") {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const top =
          el.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: "smooth" });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }
}

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-background/75 py-6 backdrop-blur-sm"
    >
      <nav className="flex items-center justify-between">
        <ul className="flex gap-4 sm:gap-8">
          {navLinks.map((nav, id) => (
            <li key={id} className="link">
              <Link
                href={nav.href}
                onClick={(e) => handleNavClick(e, nav.href, headerRef)}
                scroll={false}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-0 sm:gap-4">
          {/* <ChatToggle /> */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
