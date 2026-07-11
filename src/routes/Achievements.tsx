import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { Achievements, ContactCTA } from "@/components/navora/sections";

export const Route = createFileRoute("/Achievements")({
  component: AchievementsPage,
  head: () => ({
    meta: [
      { title: "Our Achievements — Navora Global Solutions" },
      {
        name: "description",
        content:
          "A look at the numbers behind Navora Global Solutions — executives deployed, businesses served, client satisfaction, and round-the-clock support coverage.",
      },
    ],
  }),
});

function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <Achievements />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}