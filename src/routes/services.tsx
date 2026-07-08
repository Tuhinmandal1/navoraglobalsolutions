import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { Services, WhoWeServe, ContactCTA } from "@/components/navora/sections";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Navora Global Solutions" },
      {
        name: "description",
        content:
          "Customer support, WhatsApp support, sales & admissions closing, CRM tracking, and weekly reporting — all delivered by dedicated, fully-managed executives.",
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <Services />
        <WhoWeServe />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
