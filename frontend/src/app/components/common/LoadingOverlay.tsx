"use client";

import { useTheme } from "../../../../context/ThemeContext";

export default function LoadingOverlay() {
  const { theme } = useTheme();

  return (
    <div
      className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-50"
      style={{ backgroundColor: `${theme.background}CC` }}
    >
      <div className="flex flex-col items-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-4 mb-4"
          style={{ borderColor: theme.primary }}
        ></div>
        <p className="font-medium" style={{ color: theme.text }}>
          Signing in...
        </p>
      </div>
    </div>
  );
}
