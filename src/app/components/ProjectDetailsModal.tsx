import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2, Calendar, Target, Users, ShieldAlert } from "lucide-react";
import { playClickSound, playWhooshSound } from "../utils/sound";

interface ProjectDetails {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  year: string;
}

interface ProjectDetailsModalProps {
  project: ProjectDetails | null;
  onClose: () => void;
}

const PROJECT_EXTRAS: Record<string, {
  role: string;
  team: string;
  duration: string;
  overview: string;
  features: string[];
  stats: { label: string; value: string }[];
}> = {
  "Yantra Care": {
    role: "Founder & Product Engineer",
    team: "Product, design, and operations",
    duration: "Active build",
    overview: "Yantra Care is a modern appliance repair and service-booking platform designed to simplify how customers book repairs, track service requests, and connect with technicians. The platform focuses on trust, affordability, convenience, and a premium digital service experience.",
    features: [
      "Online appliance repair booking with a multi-step customer flow.",
      "Doorstep service scheduling with technician assignment workflow.",
      "Real-time order tracking, service history, and billing support.",
      "District-based service management with WhatsApp coordination."
    ],
    stats: [
      { label: "Core Focus", value: "Customer-first" },
      { label: "Booking Flow", value: "Multi-step" },
      { label: "Service Model", value: "Doorstep" }
    ]
  },
  "Enterprise ERP": {
    role: "Lead Product Engineer",
    team: "5 Developers",
    duration: "4 Months (Complete)",
    overview: "A modular, enterprise-level planning solution designed to coordinate supply lines, automate financial reporting, track warehouse inventory levels, and compile business analytics into a centralized dashboard for high-growth firms.",
    features: [
      "Custom business analytics compiling real-time widgets and charts.",
      "Automated inventory management with barcode/QR scanning integration.",
      "Role-based control panels with detailed security protocols.",
      "Scheduled report generation exporting to PDF, CSV, or direct print."
    ],
    stats: [
      { label: "Daily Transactions", value: "12,000+" },
      { label: "Sync Latency", value: "<80ms" },
      { label: "Export Speed", value: "2s flat" }
    ]
  },
  "AI Assistant": {
    role: "AI Integration Specialist",
    team: "2 Developers",
    duration: "3 Months (Complete)",
    overview: "A highly-responsive chatbot system integrated with OpenAI models to provide intelligent, contextual support. Features custom instruction parsing, conversation saving, and modular memory buffers to optimize prompt tokens.",
    features: [
      "Sub-second streaming token generation using server-sent events.",
      "Context retention using localized sliding history window.",
      "Document ingestion and processing with vector embedding.",
      "Responsive visual rendering supporting markdown & code syntax."
    ],
    stats: [
      { label: "Avg Response", value: "1.1s" },
      { label: "Context Window", value: "16k Tokens" },
      { label: "Accuracy Rate", value: "96.4%" }
    ]
  },
  "Design System": {
    role: "UI/UX Developer",
    team: "Self-Initiated",
    duration: "2 Months (Active)",
    overview: "A robust, multi-theme system library built around accessible visual patterns. Standardized under WCAG 2.1 compliance, integrating design tokens, interactive components, and comprehensive playground environments.",
    features: [
      "Full keyboard navigation & screen-reader optimized elements.",
      "Modular design tokens compiling to Tailwind configurations.",
      "Interactive Storybook docs showing live code controls.",
      "Dynamic system theme switches compiling CSS variables on-the-fly."
    ],
    stats: [
      { label: "Storybook Score", value: "100/100" },
      { label: "Bundle Impact", value: "3.2kb gzipped" },
      { label: "Lighthouse UI", value: "100%" }
    ]
  }
};

export default function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    if (project) {
      playWhooshSound();
    }
  }, [project]);

  if (!project) return null;
  const details = PROJECT_EXTRAS[project.title] || {
    role: "Product Engineer",
    team: "Independent",
    duration: "Varies",
    overview: project.description,
    features: ["Fully modular, clean code base.", "Responsive design.", "Highly optimized rendering."],
    stats: [{ label: "Optimization", value: "Production Ready" }]
  };

  const accentColorClass = 
    project.accentColor === "cyan" ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40" :
    project.accentColor === "purple" ? "text-purple-400 border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40" :
    project.accentColor === "emerald" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40" :
    "text-orange-400 border-orange-500/20 bg-orange-500/5 hover:border-orange-500/40";

  const closeButtonHoverClass = 
    project.accentColor === "cyan" ? "hover:bg-cyan-500/10 hover:text-cyan-400" :
    project.accentColor === "purple" ? "hover:bg-purple-500/10 hover:text-purple-400" :
    project.accentColor === "emerald" ? "hover:bg-emerald-500/10 hover:text-emerald-400" :
    "hover:bg-orange-500/10 hover:text-orange-400";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto bg-black/80 backdrop-blur-[6px]"
        onClick={() => { playClickSound(); onClose(); }}
      >
        <motion.div
          initial={{ y: 50, scale: 0.95 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 50, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl rounded-2xl md:rounded-3xl border border-white/10 bg-[#0c0c0e] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top visual graphic panel */}
          <div className="relative h-44 md:h-56 w-full overflow-hidden border-b border-white/5 flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-40`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_40%,rgba(12,12,14,1)_100%)]" />
            
            {/* Ambient noise texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px]" />
            
            <div className="relative text-center space-y-2 z-10 p-6">
              <span className={`text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full border ${accentColorClass}`}>
                {project.year} Selection
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
                {project.title}
              </h2>
              <p className="text-white/50 text-xs md:text-sm tracking-wide font-light">
                {project.subtitle}
              </p>
            </div>

            <button
              onClick={() => { playClickSound(); onClose(); }}
              className={`absolute top-4 right-4 p-2 rounded-full border border-white/10 bg-black/40 text-white/60 transition-colors z-20 ${closeButtonHoverClass}`}
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Grid Content */}
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin">
            {/* Left side: Overview and Features */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-4 h-4 text-white/30" /> Project Brief
                </h3>
                <p className="text-base text-white/70 leading-relaxed font-light">
                  {details.overview}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white/30" /> Key Implementation Points
                </h3>
                <ul className="space-y-3">
                  {details.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="text-sm text-white/60 leading-relaxed font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: Project stats / parameters / meta */}
            <div className="md:col-span-5 space-y-6">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Metadata</h3>
                
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3.5">
                    <Users className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wide">Role / Scale</p>
                      <p className="text-xs text-white/80 font-light mt-0.5">{details.role}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <Calendar className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wide">Timeline</p>
                      <p className="text-xs text-white/80 font-light mt-0.5">{details.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <Users className="w-4 h-4 text-white/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-wide">Team Size</p>
                      <p className="text-xs text-white/80 font-light mt-0.5">{details.team}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Technical Performance Metrics */}
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.01] space-y-4">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Core Performance</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {details.stats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className={`text-base md:text-lg font-bold font-mono ${
                        project.accentColor === "cyan" ? "text-cyan-400" :
                        project.accentColor === "purple" ? "text-purple-400" :
                        project.accentColor === "emerald" ? "text-emerald-400" :
                        "text-orange-400"
                      }`}>{stat.value}</div>
                      <div className="text-[9px] text-white/30 tracking-tight leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies used */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Project Technologies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/8 rounded-full text-xs text-white/60 font-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 md:px-10 py-5 bg-[#08080a] border-t border-white/5 flex items-center justify-between">
            <div className="text-xs text-white/30 font-light flex items-center gap-2 select-none">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Demonstration project dashboard specs</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => { playClickSound(); }}
                className="px-4 py-2 border border-white/10 rounded-lg text-xs font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" /> Repo Code
              </button>
              <button
                onClick={() => { playClickSound(); }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  project.accentColor === "cyan" ? "bg-cyan-500 text-black hover:bg-cyan-400" :
                  project.accentColor === "purple" ? "bg-purple-500 text-white hover:bg-purple-400" :
                  project.accentColor === "emerald" ? "bg-emerald-500 text-black hover:bg-emerald-400" :
                  "bg-orange-500 text-white hover:bg-orange-400"
                }`}
              >
                Launch App <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
