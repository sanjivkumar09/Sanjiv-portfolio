import { motion, useReducedMotion, type Variants } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight, Instagram } from "lucide-react";
import { useRef, useEffect } from "react";

const stats = [
  { value: "2+", label: "Yrs Exp" },
  { value: "15+", label: "Projects" },
  { value: "5+", label: "Clients" },
];

const portrait1200Avif = new URL("../../assets/portrait-1200.avif", import.meta.url).href;
const portrait800Avif = new URL("../../assets/portrait-800.avif", import.meta.url).href;
const portrait1200Webp = new URL("../../assets/portrait-1200.webp", import.meta.url).href;
const portrait800Webp = new URL("../../assets/portrait-800.webp", import.meta.url).href;
const portrait1200Jpg = new URL("../../assets/portrait-1200.jpg", import.meta.url).href;

export default function Hero() {
  const reduce = useReducedMotion();
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const target = parallaxRef.current!;
    if (!target) return;

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;

    function onMove(e: MouseEvent) {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX = (e.clientX - cx) / rect.width;
      mouseY = (e.clientY - cy) / rect.height;
      if (!raf) raf = requestAnimationFrame(animate);
    }

    function animate() {
      lastX += (mouseX - lastX) * 0.07;
      lastY += (mouseY - lastY) * 0.07;
      target.style.transform = `translate3d(${lastX * 8}px, ${lastY * 6}px, 0) scale(1.008)`;
      raf = 0;
    }

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const animationEase = [0.2, 0.9, 0.2, 1] as const;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const reveal: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: animationEase } },
  };

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-20 py-24 sm:py-28 lg:py-0 overflow-hidden">

      {/* ── Layer 1: base dark gradient ── */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/95 via-black/88 to-black/100" />

      {/* ── Layer 2: cinematic vignette — darkens all 4 edges ── */}
      <div className="hero-vignette" aria-hidden />

      {/* ── Layer 3: ambient glow behind portrait — warm light leak ── */}
      <div className="hero-ambient-glow" aria-hidden>
        <div className="hero-ambient-glow__cyan" />
        <div className="hero-ambient-glow__violet" />
      </div>

      {/* ── Layer 4: film grain — static noise overlay, premium texture ── */}
      <div className="hero-grain" aria-hidden />

      {/* ── Portrait wrapper (CSS positioned, no framer conflict) ── */}
      <div className="hero-portrait hidden lg:block" aria-hidden>
        <motion.div
          ref={parallaxRef}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.9, 0.2, 1], delay: 0.05 }}
          style={{ willChange: "transform" }}
        >
          <picture>
            <source type="image/avif" srcSet={`${portrait1200Avif} 1200w, ${portrait800Avif} 800w`} sizes="(max-width: 1024px) 60vw, 40vw" />
            <source type="image/webp" srcSet={`${portrait1200Webp} 1200w, ${portrait800Webp} 800w`} sizes="(max-width: 1024px) 60vw, 40vw" />
            <img src={portrait1200Jpg} alt="Sanjiv Kumar Kushwaha" loading="eager" decoding="async" className="hero-portrait-img" />
          </picture>
        </motion.div>
      </div>

      {/* ── Text content ── */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="col-span-1 lg:col-span-6 space-y-5 lg:pr-6 hero-content text-center lg:text-left mx-auto lg:mx-0 max-w-2xl"
        >

          {/* Mobile portrait card */}
          <motion.div
            variants={reveal}
            className="lg:hidden relative mx-auto mb-4 w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/12 via-transparent to-purple-500/12" />
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#07070a] ring-1 ring-white/5">
              <picture>
                <source type="image/avif" srcSet={`${portrait1200Avif} 1200w, ${portrait800Avif} 800w`} sizes="240px" />
                <source type="image/webp" srcSet={`${portrait1200Webp} 1200w, ${portrait800Webp} 800w`} sizes="240px" />
                <img src={portrait1200Jpg} alt="Sanjiv Kumar Kushwaha" loading="eager" decoding="async" className="block h-auto w-full object-cover object-top" />
              </picture>
            </div>
            <div className="relative mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/45">
              <span>Product Engineer</span>
              <span className="text-emerald-400/80">Available</span>
            </div>
          </motion.div>

          {/* Status badge — pulsing availability indicator */}
          <motion.div variants={reveal} className="inline-flex items-center justify-center lg:justify-start gap-2.5 mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] sm:text-xs uppercase text-white/45 tracking-[0.18em]">
              Available for select partnerships
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={reveal} className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight max-w-[10ch] mx-auto lg:mx-0">
            <span className="block text-white">Sanjiv Kumar</span>
            <span className="block text-gradient-cyan hero-name-shimmer">Kushwaha</span>
          </motion.h1>

          {/* Bio */}
          <motion.p variants={reveal} className="text-sm sm:text-base md:text-lg text-white/60 max-w-prose mx-auto lg:mx-0 leading-relaxed">
            Founder &amp; Product Engineer crafting premium, performance-driven products — blending craft, clarity and cinematic motion.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={reveal} className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md mx-auto lg:mx-0">
            <a href="#projects" className="inline-flex w-full items-center justify-center gap-2.5 px-5 py-3 bg-white text-black rounded-full text-sm font-semibold shadow-[0_10px_30px_rgba(255,255,255,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(255,255,255,0.18)] hover:opacity-95">
              View Work <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex w-full items-center justify-center px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/80 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] hover:text-white hover:shadow-[0_18px_45px_rgba(255,255,255,0.10)]">
              Get in touch
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={reveal} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-white/70 pt-1">
            <a href="https://github.com/sanjivkumar09" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/sanjiv-kumar-014b7b277" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/sanjiv_985?igsh=eG9sOGdpZGJlcW5n" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:kushwahasanjiv01@gmail.com" aria-label="Email" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white/75 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/12 hover:text-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.08)]">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Cinematic stats row */}
          <motion.div variants={reveal} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 pt-2 border-t border-white/[0.06]">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3 sm:gap-6">
                {i > 0 && <div className="w-px h-7 bg-white/8" />}
                <div>
                  <div className="text-lg sm:text-xl font-semibold text-white leading-none">{stat.value}</div>
                  <div className="text-[11px] text-white/30 tracking-wide mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

        </motion.div>

        <div className="col-span-1 lg:col-span-6 h-0 lg:h-auto" />
      </div>

      {/* ── Scroll indicator — appears after content loads ── */}
      {!reduce && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
          aria-hidden
        >
          <span className="text-[10px] text-white/20 tracking-[0.25em] uppercase">Scroll</span>
          <motion.div
            animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent origin-top"
          />
        </motion.div>
      )}
    </section>
  );
}
