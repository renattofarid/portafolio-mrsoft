"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative">
      <button
        onClick={toggleTheme}
        className="relative w-6 h-12 bg-gray-200 dark:bg-gray-800 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label="Toggle theme"
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-gray-800 dark:bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-y-6" : "translate-y-0"
          }`}
        />
      </button>
    </div>
  );
}
