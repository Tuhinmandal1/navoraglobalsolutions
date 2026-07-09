import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const phone = "919259576387"; // Your WhatsApp number
  const message = encodeURIComponent(
    "Hi Navora Global Solutions, I'm interested in your services."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={30} />
    </a>
  );
}