import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { About, Team, ContactCTA } from "@/components/navora/sections";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Navora Global Solutions" },
      {
        name: "description",
        content:
          "Navora Global Solutions is a business process outsourcing and managed staffing company built on accountability, responsiveness, and continuous improvement.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <About />
        <Team />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
