import { motion, useScroll, useTransform } from "motion/react";
import { Mail, Github, Linkedin, Instagram, Send, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { playHoverSound, playClickSound, playSuccessChime } from "../utils/sound";
import confetti from "canvas-confetti";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    username: "@sanjivkumar09",
    href: "https://github.com/sanjivkumar09",
    gradient: "from-gray-500 to-gray-400",
    glowColor: "rgba(107, 114, 128, 0.4)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    username: "Sanjiv Kumar",
    href: "https://www.linkedin.com/in/sanjiv-kumar-014b7b277",
    gradient: "from-blue-500 to-blue-400",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: Mail,
    label: "Email",
    username: "kushwahasanjiv01@gmail.com",
    href: "mailto:kushwahasanjiv01@gmail.com",
    gradient: "from-cyan-500 to-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    icon: Instagram,
    label: "Instagram",
    username: "@sanjiv_985",
    href: "https://www.instagram.com/sanjiv_985?igsh=eG9sOGdpZGJlcW5n",
    gradient: "from-pink-500 to-purple-400",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: formProgress } = useScroll({
    target: formRef,
    offset: ["start end", "end start"]
  });

  const formY = useTransform(formProgress, [0, 1], [30, -30]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    playSuccessChime();
    setIsSubmitted(true);

    // Blast celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#06b6d4", "#8b5cf6", "#ec4899"]
    });
  };

  return (
    <section id="contact" ref={containerRef} className="relative py-20 md:py-32 lg:py-40 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-20 lg:mb-24"
        >
          <motion.div className="relative inline-block mb-8">
            <div className="absolute -inset-2 bg-cyan-500/10 blur-xl" />
            <p className="relative text-sm text-cyan-400 tracking-widest uppercase font-medium drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              Get in Touch
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/0 via-purple-500/5 to-cyan-500/0 blur-3xl" />
            <h2 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 md:mb-12">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                Let's Build
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]"
              >
                Something Meaningful
              </motion.span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-base md:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
          >
            Have an idea, project, or opportunity? I'm always open to discussing new ventures and collaborations
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ delay: 0.2, duration: 1.2 }}
          className="grid md:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              onClick={() => playClickSound()}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm p-6 md:p-8 lg:p-10 hover:border-white/10 transition-all duration-700"
            >
              {/* Atmospheric glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />

              {/* Rim light */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="relative w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16">
                    <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-700`} />
                    <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${link.gradient} bg-opacity-10 flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:border-white/10 transition-all duration-700 shadow-lg`}>
                      <link.icon className="w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 text-white/80 group-hover:text-white transition-colors duration-700" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-2 font-light uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {link.label}
                    </p>
                    <p className="font-medium text-sm md:text-base lg:text-lg group-hover:text-cyan-400 transition-colors duration-700 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {link.username}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 md:w-6 h-5 md:h-6 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-700" />
              </div>

              {/* Corner glow */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm p-6 md:p-10 lg:p-16 xl:p-20"
        >
          {/* Atmospheric backgrounds */}
          <motion.div
            style={{ y: formY }}
            className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: useTransform(formProgress, [0, 1], [-50, 50]) }}
            className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"
          />

          {/* Rim lights */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="relative">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10 space-y-6 max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <CheckCircle2 className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-white">Message Transmitted</h3>
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    Thank you! Your transmission was received successfully. Sanjiv will review your coordinates and contact you shortly.
                  </p>
                </div>
                <button
                  onClick={() => { playClickSound(); setIsSubmitted(false); setFormState({ name: "", email: "", message: "" }); }}
                  className="px-6 py-2 border border-white/10 hover:border-white/20 rounded-full text-xs text-white/50 hover:text-white transition-all cursor-pointer"
                >
                  Send another transmission
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-10 lg:mb-12 text-center tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      <label className="block text-xs md:text-sm text-white/50 mb-2 md:mb-3 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        onMouseEnter={playHoverSound}
                        placeholder="Your name"
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-500 placeholder:text-white/20 text-sm md:text-base text-white/90 backdrop-blur-sm hover:bg-white/[0.07] shadow-lg"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.75, duration: 0.8 }}
                    >
                      <label className="block text-xs md:text-sm text-white/50 mb-2 md:mb-3 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        onMouseEnter={playHoverSound}
                        placeholder="your@email.com"
                        className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-500 placeholder:text-white/20 text-sm md:text-base text-white/90 backdrop-blur-sm hover:bg-white/[0.07] shadow-lg"
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <label className="block text-sm text-white/50 mb-3 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      Message
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onMouseEnter={playHoverSound}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-500 resize-none placeholder:text-white/20 text-sm md:text-base text-white/90 backdrop-blur-sm hover:bg-white/[0.07] shadow-lg"
                    />
                  </motion.div>
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.85, duration: 0.8 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={playHoverSound}
                    className="group w-full px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-medium shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] transition-all duration-700 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg relative overflow-hidden cursor-pointer"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </form>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 md:mt-20 lg:mt-24 text-center space-y-4 md:space-y-6"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-2 h-2 rounded-full bg-white/20 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <p className="text-white/40 text-sm font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            © 2026 Sanjiv Kumar Kushwaha
          </p>
          <p className="text-white/25 text-xs font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Crafted with precision and passion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
