import { LogoMark } from "./Navbar";
import { Mail, Phone, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2.5">
              <LogoMark />
              <span className="font-display font-extrabold text-lg text-white">NAVORA</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Navora Global Solutions Pvt. Ltd. — Powering Global Business Operations.
              Dedicated, fully-managed customer support and sales teams for schools and
              growing businesses.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan" />
                <a href="mailto:navoraglobalsolutionspvtltd@gmail.com" className="hover:text-white">
                  navoraglobalsolutionspvtltd@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan" />
                <span>+91 99580 33738, 8979345532</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-cyan hover:text-cyan transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-cyan hover:text-cyan transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol title="Company" items={["About Us", "Our Values", "Careers", "Contact"]} />
          <FooterCol
            title="Services"
            items={["Customer Support", "WhatsApp Support", "Sales & Closing", "CRM & Reporting"]}
          />
          <div className="space-y-4">
            <FooterCol title="Who We Serve" items={["Schools", "SMEs", "Growing Businesses"]} />
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 border-t border-white/10 pt-10">
          <div>
            <h4 className="font-display font-semibold text-white">Newsletter</h4>
            <p className="text-sm mt-2 max-w-md">
              Field notes on support, follow-up, and outsourcing — occasional, no spam.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <input
              id="newsletter"
              type="email"
              placeholder="you@company.com"
              className="flex-1 rounded-full bg-white/5 border border-white/15 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-cyan to-blue px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Navora Global Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-wide uppercase">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-white transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
