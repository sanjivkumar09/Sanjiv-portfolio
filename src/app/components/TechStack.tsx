import { motion, useReducedMotion } from "motion/react";
import { playHoverSound } from "../utils/sound";

const techStacks = [
  {
    category: "Frontend",
    icon: "⚛️",
    techs: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
    gradient: "from-cyan-500/10 to-blue-500/10",
    borderColor: "border-cyan-500/20",
    glowColor: "rgba(6, 182, 212, 0.06)",
  },
  {
    category: "Backend",
    icon: "⚙️",
    techs: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 75 },
    ],
    gradient: "from-green-500/10 to-emerald-500/10",
    borderColor: "border-green-500/20",
    glowColor: "rgba(16, 185, 129, 0.06)",
  },
  {
    category: "Mobile",
    icon: "📱",
    techs: [
      { name: "Flutter", level: 85 },
      { name: "React Native", level: 80 },
      { name: "Dart", level: 82 },
      { name: "iOS/Android", level: 78 },
    ],
    gradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
    glowColor: "rgba(139, 92, 246, 0.06)",
  },
  {
    category: "Design",
    icon: "🎨",
    techs: [
      { name: "Figma", level: 92 },
      { name: "UI/UX", level: 90 },
      { name: "Framer", level: 85 },
      { name: "Adobe XD", level: 80 },
    ],
    gradient: "from-orange-500/10 to-red-500/10",
    borderColor: "border-orange-500/20",
    glowColor: "rgba(249, 115, 22, 0.06)",
  },
  {
    category: "Database",
    icon: "🗄️",
    techs: [
      { name: "MySQL", level: 88 },
      { name: "Firebase", level: 90 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 80 },
    ],
    gradient: "from-yellow-500/10 to-orange-500/10",
    borderColor: "border-yellow-500/20",
    glowColor: "rgba(234, 179, 8, 0.06)",
  },
  {
    category: "Tools",
    icon: "🔧",
    techs: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 80 },
      { name: "VS Code", level: 95 },
      { name: "Webpack", level: 78 },
    ],
    gradient: "from-indigo-500/10 to-purple-500/10",
    borderColor: "border-indigo-500/20",
    glowColor: "rgba(99, 102, 241, 0.06)",
  },
];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="tech-stack" className="relative py-24 sm:py-28 md:py-36 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={reduceMotion ? undefined : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20 md:mb-24 text-center"
        >
          <motion.p className="text-sm text-cyan-400 tracking-widest uppercase mb-6 font-medium">
            Technology
          </motion.p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 sm:mb-10 md:mb-12">
            <span className="block text-white">Tech</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            Mastering modern tools and frameworks to build exceptional digital products
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {techStacks.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={reduceMotion ? undefined : { delay: index * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={handleMouseMove}
              onMouseEnter={reduceMotion ? undefined : playHoverSound}
              style={{ "--spotlight-color": stack.glowColor } as React.CSSProperties}
              className={`group relative overflow-hidden rounded-3xl border ${stack.borderColor} bg-gradient-to-br ${stack.gradient} backdrop-blur-sm p-6 sm:p-8 hover:border-white/20 transition-all duration-700 project-spotlight-card ${reduceMotion ? "project-spotlight-card--lite" : ""}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6 sm:mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 tracking-tight group-hover:text-cyan-400 transition-colors duration-500">
                      {stack.category}
                    </h3>
                    <p className="text-xs text-white/40 uppercase tracking-wider">Expertise</p>
                  </div>
                  <div className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    {stack.icon}
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {stack.techs.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={reduceMotion ? undefined : { delay: index * 0.08 + techIndex * 0.05, duration: 0.6 }}
                      onMouseEnter={reduceMotion ? undefined : playHoverSound}
                      className="group/tech"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white/70 group-hover/tech:text-white transition-colors duration-300">
                          {tech.name}
                        </span>
                        <span className="text-xs text-white/40 font-mono">{tech.level}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={reduceMotion ? false : { width: 0 }}
                          whileInView={reduceMotion ? undefined : { width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={reduceMotion ? undefined : { delay: index * 0.08 + techIndex * 0.05 + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full group-hover/tech:shadow-lg group-hover/tech:shadow-cyan-500/50 transition-shadow duration-300"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={reduceMotion ? undefined : { delay: 0.6, duration: 1 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-white/60 font-light">Always learning</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span className="text-sm text-white/60 font-light">Always evolving</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
              <span className="text-sm text-white/60 font-light">Always building</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
