const lightTheme = {
  id: "light",

  // Base colors
  background: "#FFFFFF",     // Page background
  surface: "#F8FAFC",        // Elevated containers
  primary: "#171EF1",        // Brand Blue (consistent)
  primaryHover: "#0E10A6",   // Darker blue for hover
  accent: "#FFD700",         // Accent yellow (LeetCode-inspired)
  text: "#111827",           // Primary text (dark gray)
  textSecondary: "#4B5563",  // Muted/secondary text
  error: "#EF4444",          // Error red
  border: "#E5E7EB",         // Light border

  // Component-level tokens
  button: {
    background: "#171EF1",
    hover: "#0E10A6",
    text: "#FFFFFF",
  },
  input: {
    background: "#FFFFFF",
    border: "#E5E7EB",
    text: "#111827",
    placeholder: "#9CA3AF",
    focusBorder: "#171EF1",
  },
  card: {
    background: "#FFFFFF",
    shadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
};

export default lightTheme;
