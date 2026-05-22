import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { playHoverSound, playClickSound } from "../utils/sound";
import ProjectDetailsModal from "./ProjectDetailsModal";

const yantraPreviewImage = new URL("../../assets/yantra care.png", import.meta.url).href;

const projects = [
  {
    title: "Yantra Care",
    subtitle: "Appliance Repair Platform",
    description: "Premium repair and service-booking ecosystem with doorstep scheduling, technician dispatch, real-time tracking, and transparent workflows",
    tags: ["React", "Node.js", "MySQL", "Flutter"],
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
    accentColor: "cyan",
    glowColor: "rgba(59, 130, 246, 0.4)",
    year: "2026",
  },
  {
    title: "Enterprise ERP",
    subtitle: "Admin Dashboard",
    description: "Full-scale resource planning system with real-time analytics, inventory management, and automated workflows",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    gradient: "from-purple-500/20 via-pink-500/20 to-orange-500/20",
    accentColor: "purple",
    glowColor: "rgba(139, 92, 246, 0.4)",
    year: "2025",
  },
  {
    title: "AI Assistant",
    subtitle: "Conversational Platform",
    description: "Intelligent chatbot with natural language processing, context awareness, and multi-modal interactions",
    tags: ["React", "OpenAI", "Node.js", "WebSocket"],
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    accentColor: "emerald",
    glowColor: "rgba(16, 185, 129, 0.4)",
    year: "2025",
  },
  {
    title: "Design System",
    subtitle: "Component Library",
    description: "Comprehensive UI/UX system with Figma integration, extensive documentation, and accessible components",
    tags: ["React", "Tailwind", "Storybook", "Figma"],
    gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    accentColor: "orange",
    glowColor: "rgba(249, 115, 22, 0.4)",
    year: "2024",
  },
];

type Project = typeof projects[number];

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.6, 1, 1, 0.8]);

  const accentClasses = {
    cyan:    { label: "text-cyan-400",    labelMuted: "text-cyan-400/70",    line: "from-cyan-500/30",    border: "border-cyan-500/30 hover:border-cyan-500/50",    btn: "from-cyan-500/10 to-cyan-500/5 text-cyan-400", badge: "border-cyan-500/30 text-cyan-400" },
    purple:  { label: "text-purple-400",  labelMuted: "text-purple-400/70",  line: "from-purple-500/30",  border: "border-purple-500/30 hover:border-purple-500/50",  btn: "from-purple-500/10 to-purple-500/5 text-purple-400", badge: "border-purple-500/30 text-purple-400" },
    emerald: { label: "text-emerald-400", labelMuted: "text-emerald-400/70", line: "from-emerald-500/30", border: "border-emerald-500/30 hover:border-emerald-500/50", btn: "from-emerald-500/10 to-emerald-500/5 text-emerald-400", badge: "border-emerald-500/30 text-emerald-400" },
    orange:  { label: "text-orange-400",  labelMuted: "text-orange-400/70",  line: "from-orange-500/30",  border: "border-orange-500/30 hover:border-orange-500/50",  btn: "from-orange-500/10 to-orange-500/5 text-orange-400", badge: "border-orange-500/30 text-orange-400" },
  };
  const ac = accentClasses[project.accentColor as keyof typeof accentClasses];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-180px" }}
      transition={{ delay: index * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center`}
    >
      {/* Content side */}
      <div className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-5">
            <span className={`text-xs tracking-widest uppercase font-semibold ${ac.label}`}>
              {project.year}
            </span>
            <div className={`h-px flex-1 bg-gradient-to-r ${ac.line} to-transparent max-w-[120px]`} />
          </div>

          <div>
            <p className={`text-sm mb-3 font-medium ${ac.labelMuted}`}>{project.subtitle}</p>
            <h3 
              onClick={() => onOpenDetails(project)}
              onMouseEnter={playHoverSound}
              className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight transition-colors duration-500 cursor-pointer hover:text-white ${
                project.accentColor === "cyan" ? "group-hover:text-cyan-400" :
                project.accentColor === "purple" ? "group-hover:text-purple-400" :
                project.accentColor === "emerald" ? "group-hover:text-emerald-400" :
                "group-hover:text-orange-400"
              }`}
            >
              {project.title}
            </h3>
          </div>

          <p className="text-base md:text-lg text-white/50 leading-relaxed font-light max-w-xl group-hover:text-white/60 transition-colors duration-300">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                onMouseEnter={playHoverSound}
                className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-full text-white/65 font-light hover:border-white/20 hover:text-white/80 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => onOpenDetails(project)}
            onMouseEnter={playHoverSound}
            className={`px-6 py-3 bg-gradient-to-r ${ac.btn} border ${ac.border} rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2 cursor-pointer`}
          >
            View Project <ArrowUpRight className="w-4 h-4" />
          </button>
          <button 
            onMouseEnter={playHoverSound}
            onClick={() => { playClickSound(); }}
            className="px-6 py-3 border border-white/10 rounded-full text-sm font-medium hover:bg-white/5 hover:border-white/20 transition-colors duration-200 flex items-center gap-2 cursor-pointer"
          >
            <Github className="w-4 h-4" /> Code
          </button>
        </div>
      </div>

      {/* Visual side */}
      <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <div className="relative group/card cursor-pointer" onClick={() => onOpenDetails(project)}>
          {/* Main project card — with mouse spotlight hover effect */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseEnter={playHoverSound}
            style={{ 
              "--spotlight-color": project.accentColor === "cyan" ? "rgba(6, 182, 212, 0.06)" :
                                   project.accentColor === "purple" ? "rgba(139, 92, 246, 0.06)" :
                                   project.accentColor === "emerald" ? "rgba(16, 185, 129, 0.06)" :
                                   "rgba(249, 115, 22, 0.06)"
            } as React.CSSProperties}
            className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/80 to-black/80 group-hover:border-white/18 transition-border duration-500 shadow-2xl project-spotlight-card"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-35 group-hover:opacity-55 transition-opacity duration-500`} />

            <div className="relative h-full flex items-center justify-center p-4 md:p-6 lg:p-8">
              {project.title === "Yantra Care" ? (
                <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#090d24] p-2 md:p-4">
                  <img
                    src={yantraPreviewImage}
                    alt="Yantra Care preview"
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/45 to-transparent" />
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,transparent_35%,rgba(6,10,27,0.15)_72%,rgba(6,10,27,0.4)_100%)]" />
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className={[
                    "text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br bg-clip-text text-transparent opacity-20 group-hover:opacity-35 transition-opacity duration-500",
                    project.accentColor === "cyan"
                      ? "from-cyan-400 to-cyan-600"
                      : project.accentColor === "purple"
                        ? "from-purple-400 to-purple-600"
                        : project.accentColor === "emerald"
                          ? "from-emerald-400 to-emerald-600"
                          : "from-orange-400 to-orange-600",
                  ].join(" ")}>
                    {project.title.charAt(0)}
                  </div>
                  <div className="space-y-2 opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                    <div className="h-2 w-48 md:w-64 bg-white/8 rounded-full mx-auto" />
                    <div className="h-2 w-32 md:w-44 bg-white/8 rounded-full mx-auto" />
                    <div className="h-2 w-40 md:w-52 bg-white/8 rounded-full mx-auto" />
                  </div>
                </div>
              )}
            </div>

            {/* Tech badge — no backdrop-blur */}
            <div className={["absolute top-4 right-4 md:top-5 md:right-5 px-3 py-1.5 bg-black/75 rounded-full text-xs font-semibold", ac.badge].join(" ")}>
              {project.tags[0]}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenDetails = (project: Project) => {
    playClickSound();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-36 px-4 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-[1800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <p className="text-sm text-cyan-400 tracking-widest uppercase font-medium mb-6">
            Selected Work
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.92] tracking-tighter mb-8">
            <span className="block text-white">Featured</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/45 leading-relaxed font-light">
            Building modern digital products with premium experiences and engineering excellence
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28 lg:space-y-36">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              onOpenDetails={handleOpenDetails} 
            />
          ))}
        </div>
      </div>

      {/* Details drawer modal overlay */}
      <ProjectDetailsModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
