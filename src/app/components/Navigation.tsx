import { motion, useScroll } from "motion/react";
import { Code2, Search, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";
import { playHoverSound, playClickSound, getMuteState, setMuteState, playSuccessChime } from "../utils/sound";

interface NavigationProps {
  onOpenCommandMenu: () => void;
}

const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech-stack" },
  { label: "Timeline", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation({ onOpenCommandMenu }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(!getMuteState());
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
  }, [scrollY]);

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    setMuteState(!newState);
    if (newState) {
      setTimeout(() => {
        playSuccessChime();
      }, 50);
    } else {
      playClickSound();
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    playClickSound();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isMac = typeof window !== "undefined" && navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;

  return (
    <motion.nav
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1], delay: 0.08 }}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      className="fixed top-3 left-4 right-4 z-40 select-none"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          style={{ backgroundColor: scrolled ? "rgba(6,6,8,0.72)" : "rgba(6,6,8,0.22)" }}
          className="relative flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full backdrop-blur-[8px] border border-white/[0.05] overflow-hidden"
        >
          {/* Left section: Logo */}
          <motion.a 
            href="#" 
            onClick={(e) => { e.preventDefault(); playClickSound(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onMouseEnter={playHoverSound}
            className="relative flex items-center gap-2.5 z-10 cursor-pointer" 
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative w-8.5 h-8.5 rounded-full bg-white/5 border border-white/8 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-white/90" />
            </div>
            <span className="font-semibold text-sm text-white/90 tracking-tight">SK</span>
          </motion.a>

          {/* Center section: Navigation items */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 z-10">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={playHoverSound}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.04, duration: 0.45 }}
                whileHover={{ y: -1 }}
                className="text-xs lg:text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right section: Command Menu Trigger, Audio toggle & CTA */}
          <div className="flex items-center gap-2.5 z-10">
            {/* Search/Command Trigger Button */}
            <button
              onClick={onOpenCommandMenu}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.04] border border-white/5 hover:border-white/12 rounded-lg text-white/50 hover:text-white/80 transition-all duration-200 cursor-pointer text-xs font-light"
              aria-label="Open Command Menu"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] bg-white/10 rounded-md border border-white/10 font-mono leading-none">
                {isMac ? "⌘K" : "Ctrl+K"}
              </kbd>
            </button>

            {/* Audio volume toggle indicator */}
            <button
              onClick={handleToggleSound}
              onMouseEnter={playHoverSound}
              className={`p-2 border rounded-lg transition-all duration-200 cursor-pointer ${
                soundEnabled 
                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40" 
                : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/5"
              }`}
              title={soundEnabled ? "Mute interface sounds" : "Unmute interface sounds"}
              aria-label="Toggle UI Audio"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              onMouseEnter={playHoverSound}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
              whileHover={{ y: -1 }}
              className="px-3.5 py-1.5 bg-white text-black hover:opacity-90 rounded-lg text-xs font-semibold cursor-pointer transition-opacity"
            >
              Let's Talk
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
