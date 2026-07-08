import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { Pricing, ContactCTA } from "@/components/navora/sections";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Navora Global Solutions" },
      {
        name: "description",
        content:
          "Choose the level of support your business needs — from a two-executive Essentials bundle to a full New Venture Launch bundle.",
      },
    ],
  }),
});

function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <Pricing />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
