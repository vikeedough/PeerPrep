"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { useTheme } from "../../../../context/ThemeContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const baseStyle = {
    backgroundColor:
      variant === "primary"
        ? theme.button.background
        : theme.surface,
    color:
      variant === "primary"
        ? theme.button.text
        : theme.text,
    border: `1px solid ${theme.border}`,
  };

  const hoverStyle = {
    backgroundColor:
      variant === "primary"
        ? theme.button.hover
        : theme.accent,
    color:
      variant === "primary"
        ? theme.button.text
        : theme.surface,
  };

  return (
    <button
      {...props}
      className="px-4 py-2 rounded-lg font-semibold transition cursor-pointer"
      style={baseStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
        e.currentTarget.style.color = hoverStyle.color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = baseStyle.backgroundColor;
        e.currentTarget.style.color = baseStyle.color;
      }}
    >
      {children}
    </button>
  );
}
