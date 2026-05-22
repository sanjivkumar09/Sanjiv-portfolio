import { motion } from "motion/react";
import { Code2, Palette, Lightbulb, Rocket } from "lucide-react";

const principles = [
  {
    icon: Code2,
    title: "Engineering Excellence",
    description: "Building scalable systems with clean architecture, modern patterns, and performance-first thinking",
  },
  {
    icon: Palette,
    title: "UI/UX Obsession",
    description: "Crafting pixel-perfect interfaces with meticulous attention to detail and interaction design",
  },
  {
    icon: Lightbulb,
    title: "Product Thinking",
    description: "Solving real problems with elegant solutions and deep user empathy",
  },
  {
    icon: Rocket,
    title: "Modern Craftsmanship",
    description: "Creating immersive experiences with cutting-edge technologies and smooth animations",
  },
];

export default function About() {

  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-36 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 lg:mb-32 text-center max-w-4xl mx-auto"
        >
          <motion.div className="relative inline-block mb-8">
            <div className="absolute -inset-2 bg-cyan-500/10 blur-xl" />
            <p className="relative text-sm text-cyan-400 tracking-widest uppercase font-medium drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              Philosophy
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
                Approach &
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(6,182,212,0.3)]"
              >
                Mindset
              </motion.span>
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl lg:text-2xl text-white/40 leading-relaxed font-light drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
          >
            Every line of code is an opportunity to craft something exceptional
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24 lg:mb-32">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ delay: index * 0.15, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-6 md:p-10 hover:border-white/10 transition-border duration-500"
            >
              {/* Atmospheric glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-700" />

              {/* Rim light */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative">
                <div className="relative w-14 md:w-16 h-14 md:h-16 mb-6 md:mb-8 lg:mb-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center border border-white/5 group-hover:border-white/10 group-hover:scale-110 transition-all duration-700 shadow-lg">
                    <principle.icon className="w-7 md:w-8 h-7 md:h-8 text-cyan-400/80 group-hover:text-cyan-400 transition-colors duration-700 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 tracking-tight group-hover:text-cyan-400 transition-colors duration-700 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {principle.title}
                </h3>
                <p className="text-sm md:text-base text-white/50 leading-relaxed font-light group-hover:text-white/60 transition-colors duration-700 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {principle.description}
                </p>
              </div>

              {/* Corner glow */}
              <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent p-8 md:p-12 lg:p-16"
        >
          {/* Static ambient blobs — CSS only, no scroll MotionValues */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Rim lights */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <div className="relative text-center max-w-5xl mx-auto space-y-10">
            <div
              className="text-xl md:text-2xl lg:text-3xl font-light leading-[1.4] text-white/85"
            >
              I don't just write code —{" "}
              <span className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                I craft experiences
              </span>{" "}
              that users remember,{" "}
              <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                systems that scale
              </span>{" "}
              effortlessly, and{" "}
              <span className="font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                interfaces that feel magical
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
