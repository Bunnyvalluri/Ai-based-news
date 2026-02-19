"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "#detector", label: "Detector" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#metrics", label: "Performance" },
  { href: "#about", label: "About" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render toggle after mount to avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300
        dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:text-slate-300
        border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-sm
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* Sun (shown in dark mode → click to go light) */}
      <motion.svg
        key="sun"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.5 }}
        transition={{ duration: 0.25 }}
        className="absolute w-4.5 h-4.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx="12" cy="12" r="5" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </motion.svg>

      {/* Moon (shown in light mode → click to go dark) */}
      <motion.svg
        key="moon"
        initial={false}
        animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0, scale: isDark ? 0.5 : 1 }}
        transition={{ duration: 0.25 }}
        className="absolute w-4.5 h-4.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
      </motion.svg>
    </motion.button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "dark:bg-[#070711]/90 bg-white/90 backdrop-blur-xl dark:border-white/[0.06] border-slate-200/80 border-b shadow-sm dark:shadow-2xl"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg viewBox="0 0 24 24" fill="none" className="w-4.5 h-4.5" stroke="white" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span
              className="font-bold text-lg tracking-tight dark:text-white text-slate-900"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              TruthLens
            </span>
            <span className="text-[10px] font-bold tracking-widest bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 px-1.5 py-0.5 rounded-full">
              AI
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-900 rounded-lg dark:hover:bg-white/5 hover:bg-slate-100 transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side: toggle + CTA */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <a
              href="#detector"
              className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40"
            >
              Try Now
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg dark:text-slate-400 text-slate-500 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden dark:bg-[#0d0d1a] bg-white border-b dark:border-white/[0.06] border-slate-200 px-4 pb-4"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm dark:text-slate-400 text-slate-600 dark:hover:text-white hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
