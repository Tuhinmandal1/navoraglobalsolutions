import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useScrolled, addRipple } from "./hooks";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";
const logo = "/logo.jpeg";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Achievements", to: "/achievements" },
  { label: "Why Outsource", to: "/why" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
] as const;

type NavbarProps = {
  onLoginClick?: () => void;
};

export function Navbar({ onLoginClick }: NavbarProps) {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return unsubscribe;
}, []);

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

        <div className="flex items-center gap-3">

  {user ? (
  <Link to="/profile">
    <img
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.displayName || user.email || "User"
      )}&background=0D8ABC&color=fff`}
      alt="Profile"
      className="hidden sm:block w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
    />
  </Link>
) : (
  <button
    onClick={onLoginClick}
    className="hidden sm:inline-flex items-center rounded-full border border-blue px-5 py-2.5 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition"
  >
    Login
  </button>
)}

  <Link
    to="/contact"
    onClick={addRipple}
    className="ripple-container hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-cyan to-blue px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(0,194,255,0.6)] transition-transform hover:-translate-y-0.5"
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
  {user ? (
  <Link
    to="/profile"
    onClick={() => setOpen(false)}
    className="block w-full rounded-full bg-blue text-white text-center py-3 font-semibold"
  >
    My Profile
  </Link>
) : (
  <button
    onClick={() => {
      setOpen(false);
      onLoginClick?.();
    }}
    className="w-full rounded-full border border-blue px-5 py-3 text-sm font-semibold text-blue hover:bg-blue hover:text-white transition"
  >
    Login
  </button>
)}
</li>

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
