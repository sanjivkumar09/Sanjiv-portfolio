import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CornerDownLeft } from "lucide-react";
import { playClickSound, playSuccessChime } from "../utils/sound";
import confetti from "canvas-confetti";

interface TerminalOverlayProps {
  open: boolean;
  onClose: () => void;
}

interface CommandLog {
  text: string;
  type: "input" | "output" | "error" | "system";
}

const INTRO_TEXT = [
  "SK-OS [Version 2.0.26]",
  "(c) 2026 Sanjiv Kumar Kushwaha. All rights reserved.",
  "",
  "System initialization successful.",
  "Type 'help' to see list of available commands.",
  ""
];

export default function TerminalOverlay({ open, onClose }: TerminalOverlayProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal output once opened
  useEffect(() => {
    if (open) {
      setHistory(INTRO_TEXT.map(line => ({ text: line, type: "system" })));
      setInput("");
      setHistoryIdx(-1);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [open]);

  // Scroll to bottom when output updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Handle clicking anywhere in the terminal to focus input
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (commandStr: string) => {
    const trimmed = commandStr.trim();
    if (!trimmed) return;

    // Add to command history list
    const newCmdHistory = [trimmed, ...cmdHistory.filter(c => c !== trimmed)].slice(0, 50);
    setCmdHistory(newCmdHistory);
    setHistoryIdx(-1);

    // Echo input
    const newLogs: CommandLog[] = [...history, { text: `sanjiv-os:~ visitor$ ${trimmed}`, type: "input" }];

    const cmd = trimmed.toLowerCase().split(" ")[0];

    playClickSound();

    switch (cmd) {
      case "help":
        newLogs.push(
          { text: "Available commands:", type: "system" },
          { text: "  about     - Learn about Sanjiv's core background", type: "output" },
          { text: "  projects  - Monospace list of featured engineering work", type: "output" },
          { text: "  tech      - List developer tools & stack expertise levels", type: "output" },
          { text: "  email     - Display email address & copy it to clipboard", type: "output" },
          { text: "  confetti  - Celebrate with a matrix confetti explosion", type: "output" },
          { text: "  clear     - Wipe console screen buffer", type: "output" },
          { text: "  exit      - Close this terminal session and return to UI", type: "output" }
        );
        break;

      case "about":
        newLogs.push(
          { text: "Sanjiv Kumar Kushwaha — Founder & Product Engineer", type: "system" },
          { text: "--------------------------------------------------------", type: "output" },
          { text: "Crafting modern web architectures with extreme performance.", type: "output" },
          { text: "Founded Yantra Care, an appliance repair and service-booking platform.", type: "output" },
          { text: "Core philosophy: Pixel-perfect UI + Clean, scalable backend.", type: "output" }
        );
        break;

      case "projects":
        newLogs.push(
          { text: "Featured Projects:", type: "system" },
          { text: "+-----------------+---------------------+--------+", type: "output" },
          { text: "| Project Name    | Core Stack          | Year   |", type: "output" },
          { text: "+-----------------+---------------------+--------+", type: "output" },
          { text: "| Yantra Care     | React, Flutter, SQL | 2026   |", type: "output" },
          { text: "| Enterprise ERP  | Next.js, TS, Fb     | 2025   |", type: "output" },
          { text: "| AI Assistant    | WebSocket, OpenAI   | 2025   |", type: "output" },
          { text: "| Design System   | Tailwind, Figma     | 2024   |", type: "output" },
          { text: "+-----------------+---------------------+--------+", type: "output" }
        );
        break;

      case "tech":
        newLogs.push(
          { text: "Expertise Levels:", type: "system" },
          { text: "  Frontend   [██████████████████░] 94%", type: "output" },
          { text: "  Backend    [████████████████░░░] 85%", type: "output" },
          { text: "  Mobile     [████████████████░░░] 82%", type: "output" },
          { text: "  Databases  [████████████████░░░] 85%", type: "output" },
          { text: "  Design     [██████████████████░] 90%", type: "output" }
        );
        break;

      case "email":
        navigator.clipboard.writeText("kushwahasanjiv01@gmail.com");
        setTimeout(() => playSuccessChime(), 100);
        newLogs.push(
          { text: "Email Address: kushwahasanjiv01@gmail.com", type: "system" },
          { text: "[System]: Copied to clipboard successfully!", type: "output" }
        );
        break;

      case "confetti":
        setTimeout(() => {
          playSuccessChime();
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            colors: ["#22c55e", "#16a34a", "#4ade80"],
          });
        }, 100);
        newLogs.push({ text: "Success: Triggered green terminal celebration!", type: "system" });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "close":
        newLogs.push({ text: "Closing session...", type: "system" });
        setTimeout(() => onClose(), 300);
        break;

      default:
        newLogs.push({
          text: `Command not found: '${cmd}'. Type 'help' to see list of valid commands.`,
          type: "error"
        });
        break;
    }

    setHistory(newLogs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const prevIdx = historyIdx - 1;
      if (prevIdx >= 0) {
        setHistoryIdx(prevIdx);
        setInput(cmdHistory[prevIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleTerminalClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-6 font-mono text-[#4ade80]"
          aria-modal
          role="dialog"
        >
          {/* CRT scanline simulation */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(18,18,18,0)_30%,rgba(0,0,0,0.5)_100%)] z-10" />
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] z-10" />
          
          <div className="relative flex flex-col w-full h-full max-w-5xl rounded-xl border border-emerald-500/30 bg-[#060608] shadow-[0_0_50px_rgba(16,185,129,0.15)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d0d12] border-b border-emerald-500/20 text-xs text-emerald-500/60 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 animate-pulse" />
                <span>visitor@sanjiv-kushwaha:~</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  onClose();
                }}
                className="p-1 hover:bg-emerald-500/10 hover:text-[#4ade80] rounded transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-2 select-text scrollbar-thin scrollbar-thumb-emerald-500/20">
              {history.map((log, index) => {
                let colorClass = "text-emerald-400";
                if (log.type === "error") colorClass = "text-red-400";
                if (log.type === "system") colorClass = "text-[#63e6be]";
                if (log.type === "input") colorClass = "text-emerald-300 font-bold";
                return (
                  <div key={index} className={`text-sm whitespace-pre-wrap ${colorClass}`}>
                    {log.text}
                  </div>
                );
              })}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <div className="flex items-center gap-2 px-5 py-4 bg-[#08080c] border-t border-emerald-500/10">
              <span className="text-emerald-300 shrink-0 select-none font-bold">sanjiv-os:~ visitor$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#4ade80] text-sm caret-emerald-400 focus:ring-0 p-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span className="text-[10px] text-emerald-500/40 flex items-center gap-1 select-none">
                <span>Enter</span>
                <CornerDownLeft className="w-3 h-3" />
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
