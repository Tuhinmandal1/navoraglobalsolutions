import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { WhyOutsource, CaseStudies, Testimonials, ContactCTA } from "@/components/navora/sections";

export const Route = createFileRoute("/why")({
  component: WhyPage,
  head: () => ({
    meta: [
      { title: "Why Outsource — Navora Global Solutions" },
      {
        name: "description",
        content:
          "Skip hiring, training, and management overhead. Navora delivers a dedicated, fully-reported team that's operational from day one.",
      },
    ],
  }),
});

function WhyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <WhyOutsource />
        <CaseStudies />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
