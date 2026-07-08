import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useScrolled, addRipple } from "./hooks";
const logo = "/logo.jpeg";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Why Outsource", to: "/why" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
] as const;

export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-[0_4px_24px_-12px_rgba(11,31,58,0.15)] border-b border-border"
          : "bg-white/80 backdrop-blur-md border-b border-white/50"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Navora home">
          <LogoMark />
          <span className="font-display font-extrabold tracking-tight text-lg text-navy">
            NAVORA GLOBAL SOLUTIONS
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                className="text-sm font-medium text-ink hover:text-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 rounded-md"
                activeProps={{ className: "text-blue" }}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            onClick={addRipple}
            className="ripple-container hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-cyan to-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,194,255,0.6)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2"
          >
            Get Started
          </Link>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <ul className="px-6 py-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-ink font-medium"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan to-blue px-5 py-3 text-sm font-semibold text-white"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <img
      src={logo}
      alt="Navora Global Solutions logo"
      width={size}
      height={size}
      className="rounded-md object-contain bg-white"
      style={{ width: size, height: size }}
    />
  );
}
