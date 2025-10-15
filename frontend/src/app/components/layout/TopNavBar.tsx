"use client";

import { useRouter } from "next/navigation";
import { mockCheckLogin } from "../../../../lib/mockApi";
import { useTheme } from "../../../../context/ThemeContext";

export default function TopNavBar() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <header
      className="w-full border-b p-4 flex items-center"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
      }}
    >
      <div
        className="font-bold text-2xl cursor-pointer transition"
        style={{ color: theme.text }}
        onClick={() => {
          const user = mockCheckLogin();
          router.push(user ? "/problems" : "/login");
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = theme.accent)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = theme.text)
        }
      >
        [ PeerPrep Logo ]
      </div>
    </header>
  );
}
