import React, { Suspense, lazy, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import CommandMenu from "./components/CommandMenu";
import TerminalOverlay from "./components/TerminalOverlay";
import { initSoundState, playClickSound } from "./utils/sound";

// Lazy-load below-the-fold sections to reduce initial bundle and render time
const Projects = lazy(() => import("./components/Projects"));
const About = lazy(() => import("./components/About"));
const TechStack = lazy(() => import("./components/TechStack"));
const Journey = lazy(() => import("./components/Journey"));
const YantraCare = lazy(() => import("./components/YantraCare"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    // Initialize sound settings on load
    initSoundState();

    try {
      const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(Boolean(mq && mq.matches));
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      if (mq && mq.addEventListener) mq.addEventListener("change", listener);
      return () => { if (mq && mq.removeEventListener) mq.removeEventListener("change", listener); };
    } catch {
      // ignore in non-browser environments
    }
  }, []);

  return (
    <div className="dark min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <Navigation 
        onOpenCommandMenu={() => {
          playClickSound();
          setCommandMenuOpen(true);
        }} 
      />

      {/* Static atmospheric gradient — no JS animation = no scroll repaint cost */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-cyan-600/5 to-transparent blur-[80px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.015),transparent_40%)]" />
      </div>

      <div className="relative z-10">
        <Hero />
        <Suspense fallback={<div aria-hidden className="h-40" /> }>
          <Projects />
          <About />
          <TechStack />
          <Journey />
          <YantraCare />
          <Contact />
        </Suspense>
      </div>

      {/* Command Menu Dialog Overlay */}
      <CommandMenu 
        open={commandMenuOpen} 
        setOpen={setCommandMenuOpen} 
        onToggleTerminal={() => setTerminalOpen(true)} 
      />

      {/* Matrix console overlay */}
      <TerminalOverlay 
        open={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />
    </div>
  );
}
