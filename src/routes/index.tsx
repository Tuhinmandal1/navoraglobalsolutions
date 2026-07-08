import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { Hero, TrustBar, Values, ContactCTA } from "@/components/navora/sections";

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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Values />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
