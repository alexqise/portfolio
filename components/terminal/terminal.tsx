"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useVersion } from "../version-context";
import { executeCommand, WELCOME_TEXT } from "./commands";

interface HistoryLine {
  type: "input" | "output";
  text: string;
}

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();
  const { setVersion } = useVersion();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const hasOpened = useRef(false);

  useEffect(() => {
    if (isOpen) {
      if (!hasOpened.current) {
        setHistory(WELCOME_TEXT.map((text) => ({ type: "output", text })));
        hasOpened.current = true;
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newHistory: HistoryLine[] = [
      ...history,
      { type: "input", text: input },
    ];

    const result = executeCommand(input);

    if (result.action === "clear") {
      setHistory([]);
    } else {
      const outputLines = result.output.map((text) => ({
        type: "output" as const,
        text,
      }));
      setHistory([...newHistory, ...outputLines]);
    }

    if (result.action === "set-theme" && result.theme) {
      setTheme(result.theme);
    }

    if (result.action === "set-version" && result.version) {
      setVersion(result.version);
    }

    if (input.trim()) {
      setCommandHistory((prev) => [input, ...prev]);
    }
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <>
      {/* Trigger button — only visible when terminal is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg transition-all h-8 px-3 bg-surface border border-border text-foreground hover:bg-border"
          aria-label="Open terminal"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
          <span className="text-xs font-mono">terminal</span>
        </button>
      )}

      {/* Terminal panel */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 animate-slide-up">
          <div
            className="bg-surface border-t border-border shadow-2xl"
            style={{ height: "40vh" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="text-[0.65rem] text-muted">terminal</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[0.6rem] text-muted">bash</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted hover:text-foreground transition-colors"
                  aria-label="Close terminal"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1 1l12 12M13 1L1 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="terminal-scroll overflow-y-auto px-4 py-3 font-mono text-[0.75rem] leading-relaxed"
              style={{ height: "calc(40vh - 72px)" }}
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="min-h-[1.25rem]">
                  {line.type === "input" ? (
                    <div className="flex gap-2">
                      <span className="text-muted shrink-0">
                        visitor@alexqi
                      </span>
                      <span className="text-foreground shrink-0">~</span>
                      <span className="text-muted shrink-0">$</span>
                      <span className="text-foreground">{line.text}</span>
                    </div>
                  ) : (
                    <span className="text-muted whitespace-pre">{line.text}</span>
                  )}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex gap-2 min-h-[1.25rem]">
                <span className="text-muted shrink-0">
                  visitor@alexqi
                </span>
                <span className="text-foreground shrink-0">~</span>
                <span className="text-muted shrink-0">$</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-foreground outline-none caret-foreground text-[0.75rem]"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
