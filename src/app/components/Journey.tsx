import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const milestones = [
  {
    year: "2024",
    title: "Learning & Experimentation",
    description: "Began the journey into modern web technologies, exploring React, Node.js, and the fundamentals of full-stack development",
    achievements: ["First web applications", "JavaScript mastery", "UI/UX fundamentals"],
    gradient: "from-cyan-500 to-cyan-400",
  },
  {
    year: "2025",
    title: "Building Modern Systems",
    description: "Developed production applications, mastered Next.js, and built scalable architectures for real-world problems",
    achievements: ["Enterprise applications", "Advanced React patterns", "Database design"],
    gradient: "from-purple-500 to-purple-400",
  },
  {
    year: "2026",
    title: "Building Yantra Care",
    description: "Founded and building a premium appliance repair platform with customer-first workflows, technician management, and modern service booking",
    achievements: ["Founded startup", "Service marketplace", "Customer workflows"],
    gradient: "from-sky-500 to-violet-400",
  },
  {
    year: "Future",
    title: "Scaling Technology Products",
    description: "Expanding impact through innovative digital solutions, mentorship, and pushing the boundaries of engineering excellence",
    achievements: ["Innovation", "Scale", "Impact"],
    gradient: "from-blue-500 to-blue-400",
  },
];

export default function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" ref={containerRef} className="relative py-24 sm:py-28 md:py-36 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20 md:mb-24 text-center"
        >
          <motion.p className="text-sm text-cyan-400 tracking-widest uppercase mb-6 font-medium">
            Timeline
          </motion.p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8 sm:mb-10 md:mb-12">
            <span className="block text-white">The</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light px-2 sm:px-0">
            Every step forward is an opportunity to learn, build, and create something extraordinary
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"
            />
          </div>

          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative grid md:grid-cols-2 gap-6 sm:gap-8 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:order-2"}`}>
                  <div className={`ml-12 sm:ml-16 md:ml-0 space-y-6 ${index % 2 === 0 ? "md:items-end md:flex md:flex-col" : ""}`}>
                    <div>
                      <div className={`inline-flex items-center gap-3 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r ${milestone.gradient} bg-opacity-10 border border-white/10 mb-4 backdrop-blur-sm`}>
                        <span className={`text-sm font-bold bg-gradient-to-r ${milestone.gradient} bg-clip-text text-transparent`}>
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                        {milestone.title}
                      </h3>
                      <p className="text-white/50 text-sm sm:text-base leading-relaxed font-light mb-6">
                        {milestone.description}
                      </p>
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                        {milestone.achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="px-4 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/60 backdrop-blur-sm"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="ml-12 sm:ml-16 md:ml-0 relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-sm group hover:border-white/20 transition-all duration-700">
                    <div className={`absolute inset-0 bg-gradient-to-br ${milestone.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-700`} />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_70%)]" />

                    <div className="relative h-full flex items-center justify-center p-6 sm:p-10 md:p-12">
                      <div className="text-center">
                        <div className={`text-5xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-br ${milestone.gradient} bg-clip-text text-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-700 mb-4 sm:mb-6`}>
                          {milestone.year}
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 w-48 bg-white/5 rounded-full mx-auto" />
                          <div className="h-2 w-32 bg-white/5 rounded-full mx-auto" />
                          <div className="h-2 w-40 bg-white/5 rounded-full mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 flex items-center justify-center z-10 shadow-lg">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    className={`w-2 h-2 rounded-full bg-gradient-to-br ${milestone.gradient} shadow-lg`}
                    style={{
                      boxShadow: `0 0 20px rgba(${
                        milestone.gradient.includes('cyan') ? '6,182,212' :
                        milestone.gradient.includes('purple') ? '139,92,246' :
                        milestone.gradient.includes('pink') ? '236,72,153' :
                        '59,130,246'
                      },0.6)`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
