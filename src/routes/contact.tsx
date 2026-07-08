import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navora/Navbar";
import { Footer } from "@/components/navora/Footer";
import { ContactCTA } from "@/components/navora/sections";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Navora Global Solutions" },
      {
        name: "description",
        content:
          "Have an operations gap you need filled? Send us an enquiry and we'll get back within one business day.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
