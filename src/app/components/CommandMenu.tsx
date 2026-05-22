import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./ui/command";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Terminal,
  FolderKanban,
  User,
  MapPin,
  Cpu,
  Mail,
  Copy,
  Check,
  Search,
} from "lucide-react";
import { playClickSound, playSuccessChime, getMuteState, setMuteState } from "../utils/sound";
import confetti from "canvas-confetti";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onToggleTerminal: () => void;
}

export default function CommandMenu({ open, setOpen, onToggleTerminal }: CommandMenuProps) {
  const [soundEnabled, setSoundEnabled] = useState(!getMuteState());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        playClickSound();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const handleNavigate = (selector: string) => {
    setOpen(false);
    playClickSound();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleSound = () => {
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("kushwahasanjiv01@gmail.com");
    setCopied(true);
    playSuccessChime();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfetti = () => {
    setOpen(false);
    playSuccessChime();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#06b6d4", "#8b5cf6", "#ec4899"],
    });
  };

  const handleTerminal = () => {
    setOpen(false);
    playClickSound();
    onToggleTerminal();
  };

  return (
    <CommandDialog open={open} onOpenChange={(val) => { if (val) playClickSound(); setOpen(val); }}>
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#0c0c0e]">
        <CommandInput placeholder="Type a command or search..." className="border-none text-white focus-visible:outline-none" />
      </div>
      <CommandList className="bg-[#0c0c0e] text-white/80 p-2 max-h-[360px] scrollbar-thin">
        <CommandEmpty className="py-6 text-center text-sm text-white/40">No results found.</CommandEmpty>
        
        <CommandGroup heading="Navigation" className="text-white/40 font-semibold px-2 py-1.5 text-xs">
          <CommandItem
            onSelect={() => handleNavigate("#projects")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <FolderKanban className="w-4 h-4 text-cyan-400" />
            <span>Go to Featured Projects</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleNavigate("#about")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <User className="w-4 h-4 text-purple-400" />
            <span>Go to About / Philosophy</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleNavigate("#tech-stack")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Go to Technology Stack</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleNavigate("#journey")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <MapPin className="w-4 h-4 text-pink-400" />
            <span>Go to Journey Timeline</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleNavigate("#contact")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <Mail className="w-4 h-4 text-blue-400" />
            <span>Go to Contact Info</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-white/[0.08] my-2" />

        <CommandGroup heading="Aesthetics & System" className="text-white/40 font-semibold px-2 py-1.5 text-xs">
          <CommandItem
            onSelect={handleToggleSound}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
              <span>Toggle UI Sound Effects</span>
            </div>
            <span className="text-xs text-white/40 font-mono">{soundEnabled ? "Enabled" : "Muted"}</span>
          </CommandItem>

          <CommandItem
            onSelect={handleTerminal}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Open Retro Developer Console (CLI)</span>
          </CommandItem>

          <CommandItem
            onSelect={handleConfetti}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Celebrate! (Triggers Confetti)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="bg-white/[0.08] my-2" />

        <CommandGroup heading="Contact / Copy" className="text-white/40 font-semibold px-2 py-1.5 text-xs">
          <CommandItem
            onSelect={handleCopyEmail}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5 data-[selected=true]:bg-white/5 data-[selected=true]:text-white cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <span>Copy Email Address</span>
            </div>
            <span className="text-xs text-white/40 font-mono">kushwahasanjiv01@gmail.com</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
