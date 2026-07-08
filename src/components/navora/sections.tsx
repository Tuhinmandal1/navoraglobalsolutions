import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  Headphones,
  Target,
  MessageSquare,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  School,
  Building2,
  TrendingUp,
  Check,
  Sparkles,
  Mail,
  Phone,
} from "lucide-react";
import { Constellation } from "./Constellation";
import { addRipple, useCountUp, useReveal } from "./hooks";

/* ---------- Shared building blocks ---------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue">
      <span className="h-px w-8 bg-blue/50" />
      {children}
    </span>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- Hero ---------- */

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-gradient text-white pt-32 pb-24 sm:pt-40 sm:pb-32">
      <Constellation />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-navy-deep/80" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/5 px-4 py-1.5 text-xs font-medium text-cyan shadow-[0_0_30px_-8px_rgba(0,194,255,0.5)]">
              <Sparkles className="h-3.5 w-3.5" />
              Now supporting schools and growing businesses with dedicated remote teams
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
              Your <span className="text-gradient-cyan">growth</span>
              <br className="hidden sm:block" /> shouldn't wait on your operations.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Dedicated Customer Support and Sales & Closing executives — fully managed,
              fully reported, with zero hiring hassle. Navora recruits, trains, and
              supervises your team so you don't have to.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                onClick={addRipple}
                className="ripple-container group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-blue px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_rgba(0,194,255,0.65)] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                Book a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                See What We Offer
              </a>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <HeroStat text="50+" label="Point of Contact (Account Manager)" />
              <HeroStat text="Weekly" label="Performance Reports" />
              <HeroStat number={100} suffix="%" label="Remote-First Team" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ number, text, suffix = "", label }: { number?: number; text?: string; suffix?: string; label: string }) {
  const ref = useReveal<HTMLDivElement>();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  const value = useCountUp(number ?? 0, visible);
  return (
    <div ref={ref} className="reveal text-center">
      <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {number != null ? `${value}${suffix}` : text}
      </div>
      <div className="mt-2 text-xs text-white/60 leading-relaxed">{label}</div>
    </div>
  );
}

/* ---------- Trust bar ---------- */

export function TrustBar() {
  const items = [
    { icon: "🏫", label: "Schools & Institutes" },
    { icon: "🏬", label: "Retail & Service Businesses" },
    { icon: "🏢", label: "SMEs & Startups" },
    { icon: "📞", label: "Support-Driven Teams" },
  ];
  return (
    <section className="border-b border-border bg-white py-14">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Built for organizations like these</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((i) => (
            <div key={i.label} className="flex items-center gap-2.5 text-ink font-medium">
              <span className="text-2xl">{i.icon}</span>
              <span className="text-sm">{i.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs italic text-ink-muted max-w-xl mx-auto">
          We're onboarding our first client engagements — real client names and logos will be featured
          here as those partnerships go live.
        </p>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <Reveal>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-navy leading-tight">
              Navora Global Solutions is a business process outsourcing and managed staffing
              company built on a simple belief — growing organizations shouldn't have to choose
              between operational excellence and cost efficiency.
            </h2>
            <p className="mt-6 text-ink-muted text-base leading-relaxed">
              We provide dedicated, fully-managed executives for customer support, backend
              operations, WhatsApp communication, and sales & admissions closing — delivered as
              a structured, accountable service rather than a loose staffing arrangement. Our
              clients don't just get manpower; they get a system: trained executives, standard
              operating procedures, quality monitoring, weekly and monthly performance reporting,
              and a dedicated account manager.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-white p-5 card-lift hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(11,31,58,0.2)]">
                <h4 className="font-display font-semibold text-navy">Remote-First</h4>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  All executives work from secure, well-equipped remote workstations, keeping
                  costs low without compromising accountability.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-white p-5 card-lift hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(11,31,58,0.2)]">
                <h4 className="font-display font-semibold text-navy">Fully Reported</h4>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  Every enquiry, call, and lead is tracked and reported — nothing happens in a
                  black box.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <OrbitVisual />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute inset-0 rounded-full bg-navy-gradient" />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-cyan/25"
          style={{ transform: `scale(${0.55 + i * 0.18})` }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan to-blue shadow-[0_0_60px_20px_rgba(0,194,255,0.35)]" />
      </div>
      {/* orbiting dots */}
      {[
        { top: "12%", left: "50%" },
        { top: "50%", left: "88%" },
        { top: "82%", left: "38%" },
        { top: "35%", left: "18%" },
      ].map((p, idx) => (
        <span
          key={idx}
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_20px_4px_rgba(0,194,255,0.6)]"
          style={p}
        />
      ))}
    </div>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  {
    icon: Headphones,
    title: "Backend & Customer Support Executive",
    desc: "Handles incoming calls, WhatsApp support, complaint registration and follow-up, and backend record-keeping — becoming the first point of contact for your customers, parents, or students.",
  },
  {
    icon: Target,
    title: "Sales & Admissions/Closing Executive",
    desc: "Manages outbound calling, structured lead follow-up, appointment scheduling, and conversion of enquiries into confirmed admissions or sales.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Business Support",
    desc: "A dedicated WhatsApp desk for enquiries, fee questions, timings, and general information — with response times tracked and reported.",
  },
  {
    icon: ClipboardList,
    title: "CRM & Lead Tracking",
    desc: "Daily-updated lead and enquiry tracking, so no follow-up is ever missed and every lead's status is fully visible.",
  },
  {
    icon: BarChart3,
    title: "Weekly & Monthly Reporting",
    desc: "Structured performance reports delivered every week, plus a monthly strategic review covering conversion rates and recommendations.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Monitoring & Coaching",
    desc: "Ongoing call and chat review by a dedicated Team Lead, ensuring consistent tone, accuracy, and professionalism.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-navy leading-tight">
              Two dedicated roles. One complete operations layer.
            </h2>
            <p className="mt-5 text-ink-muted text-lg leading-relaxed">
              Every engagement is built around two core executives, backed by the training,
              tools, and reporting needed to make them effective.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#pricing"
            onClick={addRipple}
            className="ripple-container inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white hover:bg-navy-deep transition-colors"
          >
            Get a Custom Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, desc }: { icon: typeof Headphones; title: string; desc: string }) {
  return (
    <div className="group relative h-full rounded-[20px] border border-border bg-white p-7 card-lift hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,0.28)] hover:border-cyan/40">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan/15 to-blue/10 text-blue group-hover:from-cyan group-hover:to-blue group-hover:text-white transition-colors">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display font-semibold text-lg text-navy leading-snug">{title}</h3>
      <p className="mt-3 text-sm text-ink-muted leading-relaxed">{desc}</p>
    </div>
  );
}

/* ---------- Who We Serve ---------- */

export function WhoWeServe() {
  const items = [
    {
      icon: School,
      emoji: "🏫",
      title: "Schools & Educational Institutions",
      desc: "Admissions support, parent communication, and enquiry-to-enrollment conversion.",
    },
    {
      icon: Building2,
      emoji: "🏢",
      title: "Small & Medium Enterprises",
      desc: "Customer support and sales follow-up — without the overhead of direct hiring.",
    },
    {
      icon: TrendingUp,
      emoji: "📈",
      title: "Growing Businesses",
      desc: "Any organization with a rising volume of enquiries that needs consistent, professional handling.",
    },
  ];
  return (
    <section className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Who We Serve</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-navy leading-tight">
              Built for organizations that can't afford to miss a single enquiry.
            </h2>
            <p className="mt-5 text-ink-muted text-lg leading-relaxed">
              We currently support schools and growing businesses that receive a steady stream of
              calls, WhatsApp messages, and leads — and need a dedicated team to make sure none
              of them go unanswered.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <div className="h-full rounded-[20px] border border-border bg-white p-8 card-lift hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,0.28)]">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
                  <it.icon className="h-6 w-6 text-cyan" />
                </div>
                <h3 className="mt-5 font-display font-semibold text-lg text-navy">{it.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Values ---------- */

const VALUES = [
  {
    n: "01",
    title: "Accountability",
    desc: "Every engagement is measured, reported, and reviewed — never just trust-based.",
  },
  {
    n: "02",
    title: "Responsiveness",
    desc: "Strict response-time standards for both our executives and our own client communication.",
  },
  {
    n: "03",
    title: "No Enquiry Left Behind",
    desc: "The single most common way businesses lose customers is silence. We're built to eliminate it.",
  },
  {
    n: "04",
    title: "Continuous Improvement",
    desc: "Monthly reviews aren't a formality — they're a structured opportunity to refine and improve.",
  },
];

export function Values() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>What Guides Us</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-navy leading-tight">
              Four principles behind every engagement.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 80}>
              <div className="h-full rounded-[20px] bg-navy-gradient p-7 text-white card-lift hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-20px_rgba(0,194,255,0.35)] border border-white/5 hover:border-cyan/40">
                <div className="font-mono text-3xl font-bold text-cyan">{v.n}</div>
                <h3 className="mt-4 font-display font-semibold text-lg">{v.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why Outsource ---------- */

export function WhyOutsource() {
  const items = [
    { title: "No Hiring Hassle", desc: "We recruit, train, and supervise your executives — you skip job postings, interviews, and onboarding." },
    { title: "Lower Cost, Same Quality", desc: "Remote-first model keeps overhead down without cutting corners on training or oversight." },
    { title: "Full Accountability & Reporting", desc: "Weekly and monthly reports mean you always know how enquiries are being handled." },
    { title: "Faster Time to Live", desc: "Skip months of hiring — your team is trained and operational in a fraction of the time." },
  ];
  return (
    <section id="why" className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Why Outsource</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-navy leading-tight">
              The case for a dedicated, managed team.
            </h2>
            <p className="mt-5 text-ink-muted text-lg leading-relaxed">
              Hiring, training, and managing in-house support and sales staff is slow and
              expensive. Navora replaces that overhead with a system that's ready from day one.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 70}>
              <div className="h-full rounded-[20px] border border-border bg-white p-7 card-lift hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,0.28)] hover:border-cyan/40">
                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-cyan to-blue" />
                <h3 className="mt-5 font-display font-semibold text-lg text-navy">{it.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Placeholders: Case Studies / Testimonials / Team ---------- */

export function CaseStudies() {
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <Eyebrow>Proof, not promises</Eyebrow>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-navy leading-tight">
            We're currently onboarding our first client engagements.
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            Real case studies — with outcomes, not claims — will be published here as our
            engagements go live.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 bg-navy-gradient text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/20 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <Eyebrow>
            <span className="text-cyan">Client Voices</span>
          </Eyebrow>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl leading-tight">
            We're proud to be building trusted partnerships with schools and businesses.
          </h2>
          <p className="mt-5 text-white/70 leading-relaxed">
            Client testimonials will be featured here as our engagements go live.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Team() {
  return (
    <section className="py-20 sm:py-24 bg-surface">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <Eyebrow>Our Team</Eyebrow>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-navy leading-tight">
            A growing, fully remote team.
          </h2>
          <p className="mt-5 text-ink-muted leading-relaxed">
            Recruited, trained, and managed by Navora — working across India to support your operations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Insights ---------- */

export function Insights() {
  const posts = [
    "5 Signs Your Company Is Slow in Follow-Up",
    "Why WhatsApp Support Is No Longer Optional for Schools or Companies",
    "How to Measure If Your Outsourced Team Is Actually Working",
  ];
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-navy leading-tight">
              Field notes on support, follow-up, and outsourcing.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p} delay={i * 80}>
              <article className="group h-full rounded-[20px] border border-border bg-white overflow-hidden card-lift hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,0.28)]">
                <div className="h-40 bg-navy-gradient relative overflow-hidden">
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan/40 blur-2xl" />
                  </div>
                  <div className="absolute bottom-4 left-5 font-mono text-xs text-cyan">
                    0{i + 1} / Insights
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="font-display font-semibold text-lg text-navy leading-snug group-hover:text-blue transition-colors">
                    {p}
                  </h3>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue">
                    Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

const PACKAGES = [
  {
    emoji: "📦",
    name: "Essentials Bundle",
    desc: "Two dedicated executives: Backend & Customer Support + Sales & Closing. Everything you need to stop losing enquiries and start converting leads consistently.",
    features: [
      "Calls & WhatsApp handling",
      "Complaint registration & resolution",
      "Outbound lead follow-up",
      "Enquiry-to-sale conversion",
      "Weekly performance reports",
    ],
  },
  {
    emoji: "📦",
    name: "Growth Bundle",
    popular: true,
    desc: "Everything in Essentials, plus a dedicated Social Media Marketing Executive managing your content calendar, posting, and page growth across platforms.",
    features: [
      "Everything in Essentials",
      "Content calendar planning",
      "Organic posting across Instagram, Facebook & LinkedIn",
      "Page growth & engagement tracking",
      "Monthly performance reporting",
    ],
  },
  {
    emoji: "📦",
    name: "Complete Brand & Growth Bundle",
    desc: "Everything in Growth, plus a professional Brand Identity Package — logo, brand guidelines, and visual identity that ties your support, sales, and social presence together.",
    features: [
      "Everything in Growth",
      "Custom logo design",
      "Brand guideline document",
      "Business card & letterhead design",
      "Social media post templates",
    ],
  },
  {
    emoji: "📦",
    name: "New Venture Launch Bundle",
    desc: "For businesses launching something new: Complete Bundle, plus a website, brand naming & launch strategy, and social media account setup — everything needed to go from idea to live in the market.",
    features: [
      "Everything in Complete Bundle",
      "Business website (up to 2 pages)",
      "Brand naming & positioning support",
      "Go-to-market launch strategy",
      "Social media account setup with branded templates",
    ],
  },
  {
    emoji: "📦",
    name: "BPO Partner Bundle",
    tag: "for BPO & outsourcing companies",
    desc: "For BPO and call center companies needing extra capacity, backup manpower, or white-label execution — without expanding their own hiring. Navora supplies trained agent pools that work under your brand, your SOPs, and your client SLAs.",
    features: [
      "Dedicated agent pool for overflow or backup capacity",
      "White-label execution — agents represent your brand, not ours",
      "Flexible scaling up or down based on your client volume",
      "Multi-shift & multi-language support on request",
      "Compliance with your existing SOPs & quality benchmarks",
      "Weekly capacity & performance reports for your internal review",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <Eyebrow>What We Offer</Eyebrow>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl text-navy leading-tight">
              Pick the level of support your business needs — and scale up anytime.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <PricingCard pkg={p} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted italic max-w-2xl mx-auto">
          Every bundle includes a dedicated account manager and weekly reporting. Get in touch
          for a custom quote tailored to your business.
        </p>
      </div>
    </section>
  );
}

function PricingCard({ pkg }: { pkg: (typeof PACKAGES)[number] }) {
  const popular = pkg.popular;
  return (
    <div
      className={`relative h-full rounded-[20px] p-7 card-lift hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(11,31,58,0.28)] flex flex-col ${
        popular
          ? "border-2 border-cyan bg-white shadow-[0_20px_50px_-25px_rgba(0,194,255,0.5)]"
          : "border border-border bg-white"
      }`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan to-blue px-4 py-1 text-xs font-semibold text-white shadow-lg">
          <Sparkles className="h-3 w-3" /> Most Popular
        </span>
      )}
      <div className="flex items-center gap-2 text-2xl">
        <span>{pkg.emoji}</span>
      </div>
      <h3 className="mt-2 font-display font-bold text-xl text-navy">
        {pkg.name}
        {pkg.tag && <span className="block text-xs font-medium text-blue mt-1">({pkg.tag})</span>}
      </h3>
      <p className="mt-3 text-sm text-ink-muted leading-relaxed">{pkg.desc}</p>

      <ul className="mt-6 space-y-3 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm text-ink">
            <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-cyan/15 text-blue">
              <Check className="h-3 w-3" />
            </span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        onClick={addRipple}
        className={`ripple-container mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
          popular
            ? "bg-gradient-to-r from-cyan to-blue text-white hover:-translate-y-0.5"
            : "bg-navy text-white hover:bg-navy-deep"
        }`}
      >
        Get a Custom Quote
      </a>
    </div>
  );
}

/* ---------- Contact CTA ---------- */

export function ContactCTA() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-navy-gradient text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-blue/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Have an operations gap you need filled?{" "}
              <span className="text-gradient-cyan">Let's scope it together.</span>
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Tell us about your enquiry volume and current process — we'll get back to you within
              one business day with a tailored plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:navoraglobalsolutionspvtltd@gmail.com"
                onClick={addRipple}
                className="ripple-container inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-blue px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_-15px_rgba(0,194,255,0.65)] hover:-translate-y-0.5 transition-transform"
              >
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-md px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View Pricing
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4 text-cyan" />
                <a href="mailto:navoraglobalsolutionspvtltd@gmail.com" className="hover:text-white break-all">
                  navoraglobalsolutionspvtltd@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4 text-cyan" />
                <span>+91 99580 33738</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const OWNER_EMAIL = "navoraglobalsolutionspvtltd@gmail.com";

function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("msg") ?? "").trim();

    const subject = `New enquiry from ${name || "website visitor"}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent from navora website`;
    const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[24px] border border-cyan/30 bg-white/5 backdrop-blur-md p-8 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-blue text-white">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="mt-4 font-display font-semibold text-xl text-white">
          Your email app just opened
        </h3>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">
          Please hit <span className="font-semibold text-white">Send</span> in your email
          client to deliver your enquiry to{" "}
          <a href={`mailto:${OWNER_EMAIL}`} className="text-cyan hover:underline">
            {OWNER_EMAIL}
          </a>
          . We'll respond within one business day.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-md p-7 space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="msg" className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
          Tell us about your operations
        </label>
        <textarea
          id="msg"
          name="msg"
          rows={4}
          required
          className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-cyan resize-none"
          placeholder="Roughly how many enquiries per week, current process..."
        />
      </div>
      <button
        type="submit"
        onClick={addRipple}
        className="ripple-container w-full rounded-full bg-gradient-to-r from-cyan to-blue px-6 py-3.5 text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform"
      >
        Send enquiry
      </button>
      <p className="text-xs text-white/50 text-center">
        Opens your email app pre-filled to {OWNER_EMAIL}.
      </p>
    </form>
  );
}

