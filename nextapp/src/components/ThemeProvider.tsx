"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"        // Set default to light
      forcedTheme="light"         // Force light mode
      enableSystem={false}        // Ignore system preference
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  );
}
