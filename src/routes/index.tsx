import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { Hero, TrustBar, Values, ContactCTA } from "@/components/navora/sections";
import WhatsAppFloat from "@/components/navora/WhatsAppFloat";
import AuthModel from "@/components/navora/AuthModel";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Navora Global Solutions — Powering Global Business Operations" },
      {
        name: "description",
        content:
          "Dedicated, fully-managed customer support and sales teams for schools and growing businesses.",
      },
    ],
  }),
});

function Index() {
  const [showAuth, setShowAuth] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {!loggedIn && showAuth && (
  <AuthModel onClose={() => setShowAuth(false)} />
)}

      <div className="min-h-screen bg-background text-foreground">
        {/* Navbar doesn't currently expose props in its types; ignore TS here */}
        {/* @ts-ignore */}
        <Navbar onLoginClick={() => setShowAuth(true)} />

        <main>
          <Hero />
          <TrustBar />
          <Values />
          <ContactCTA />
        </main>

        <Footer />
        <WhatsAppFloat />
      </div>
    </>
  );
}
