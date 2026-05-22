import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Clock3, ShieldCheck, Sparkles, Truck, Wrench } from "lucide-react";

const previewImage = new URL("../../assets/yantra care.png", import.meta.url).href;
const siteUrl = "https://www.yantra-care.in/";

const highlights = [
  "Online appliance repair booking",
  "Doorstep service scheduling",
  "Real-time service tracking",
  "Transparent pricing workflow",
];

const trustPoints = [
  { label: "Bookings", value: "Multi-step" },
  { label: "Tracking", value: "Live" },
  { label: "Coverage", value: "District based" },
];

const featureCards = [
  {
    icon: Wrench,
    title: "Repair Bookings",
    description: "Fast customer flow for appliance issues, follow-ups, and doorstep scheduling.",
  },
  {
    icon: Truck,
    title: "Technician Dispatch",
    description: "District-level forwarding and assignment for the nearest available technician.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Workflow",
    description: "Secure accounts, transparent service updates, and cleaner customer communication.",
  },
  {
    icon: Clock3,
    title: "Live Progress",
    description: "Order status, billing, and service history in one premium customer-first flow.",
  },
];

export default function YantraCare() {
  return (
    <section id="yantra-care" className="relative overflow-hidden py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(67,97,238,0.22),transparent_35%),radial-gradient(circle_at_70%_65%,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_85%_25%,rgba(14,165,233,0.18),transparent_25%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1330] via-[#101331] to-[#121326]" />

      <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
          className="lg:col-span-6 space-y-7"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
            <Sparkles className="w-4 h-4 text-sky-300" />
            AI-Powered Repair Network
          </div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[0.98]">
              <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-400 bg-clip-text text-transparent">Appliance Repair</span>
              <span className="block text-white">Redefined</span>
            </h2>
            <p className="text-xl md:text-2xl font-semibold text-white/95 leading-tight max-w-2xl">
              Professional, transparent, and AI-powered service network for all your home appliance needs.
            </p>
            <p className="text-base md:text-lg text-white/45 leading-relaxed max-w-2xl">
              Yantra Care is a modern appliance repair and service-booking platform built to simplify how customers book repairs,
              track service requests, and connect with technicians through a premium digital experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-black text-white font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 text-white/90 font-semibold backdrop-blur-sm transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
            >
              Explore Project
            </a>
            <a
              href={siteUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-100 font-semibold backdrop-blur-sm transition-colors duration-200 hover:border-cyan-300/50 hover:bg-cyan-300/15"
            >
              Visit Yantra Care
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {highlights.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-white/70">
                <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-white/55">
            {trustPoints.map((point, index) => (
              <div key={point.label} className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  <span className="h-4 w-4 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
                  <span className="h-4 w-4 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(96,165,250,0.45)]" />
                  <span className="h-4 w-4 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.45)]" />
                  <span className="h-4 w-4 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.45)]" />
                </div>
                <div className="text-sm leading-tight">
                  <span className="text-orange-300">{point.label}</span> <span className="text-white/85 font-semibold">{point.value}</span>
                </div>
                {index < trustPoints.length - 1 && <div className="hidden sm:block w-px h-5 bg-white/10" />}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ delay: 0.12, duration: 0.95, ease: [0.2, 0.9, 0.2, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 md:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(96,165,250,0.22),transparent_25%),radial-gradient(circle_at_70%_55%,rgba(168,85,247,0.22),transparent_25%),radial-gradient(circle_at_80%_25%,rgba(251,191,36,0.16),transparent_20%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:28px_28px] opacity-30" />

            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#090d24]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/70 to-transparent">
                <div className="text-xs uppercase tracking-[0.28em] text-white/45">Yantra Care</div>
                <a href={siteUrl} target="_blank" rel="noreferrer noopener" className="text-xs text-cyan-200/90 hover:text-cyan-100 transition-colors">
                  Open live site
                </a>
              </div>

              <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden bg-[#090d24] p-2 md:p-4">
                <img
                  src={previewImage}
                  alt="Yantra Care website preview"
                  className="h-full w-full object-contain object-center"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_30%,rgba(6,10,27,0.2)_70%,rgba(6,10,27,0.55)_100%)]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 bg-gradient-to-t from-black/80 via-black/25 to-transparent">
                <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Premium UI</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Appliance Repair</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Service Booking</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-300">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/50">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.d