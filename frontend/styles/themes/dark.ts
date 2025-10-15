const darkTheme = {
  id: "dark",

  // Base colors
  background: "#0D0D0D",     // Background
  surface: "#121212",        // Elevated containers
  primary: "#171EF1",        // Brand Blue
  primaryHover: "#0E10A6",   // Darker blue for hover
  accent: "#FFD700",         // Accent yellow (LeetCode-inspired)
  text: "#FFFFFF",           // Primary text
  textSecondary: "#A0A0A0",  // Muted/secondary text
  error: "#FF4D4D",          // Error red
  border: "#2A2A2A",         // Borders / outlines

  // Component-level tokens
  button: {
    background: "#171EF1",
    hover: "#0E10A6",
    text: "#FFFFFF",
  },
  input: {
    background: "#1A1A1A",
    border: "#2A2A2A",
    text: "#FFFFFF",
    placeholder: "#777777",
    focusBorder: "#171EF1",
  },
  card: {
    background: "#181818",
    shadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
};

export default darkTheme;