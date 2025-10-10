"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockLogin } from "../../../../lib/mockApi";
import { useTheme } from "../../../../context/ThemeContext";

interface LoginFormProps {
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  setInvalidFields: (fields: string[]) => void;
}

export default function LoginForm({ setLoading, setError, setInvalidFields }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInvalidFields([]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return setError("⚠️ Email cannot be empty.");
    if (!password.trim()) return setError("⚠️ Password cannot be empty.");
    if (!emailRegex.test(email)) return setError("❌ Invalid email format.");

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));

      const user = mockLogin(email, password, rememberMe);
      console.log("✅ Logged in as:", user.name);
      router.push("/problems");
    } catch {
      setInvalidFields(["email", "password"]);
      setError("❌ Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
      <input
        type="email"
        placeholder="Email"
        className="rounded-lg p-2 focus:outline-none"
        style={{
          backgroundColor: theme.input.background,
          color: theme.input.text,
          border: `1px solid ${theme.input.border}`,
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="rounded-lg p-2 focus:outline-none"
        style={{
          backgroundColor: theme.input.background,
          color: theme.input.text,
          border: `1px solid ${theme.input.border}`,
        }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label
        className="flex items-center gap-2 text-sm"
        style={{ color: theme.textSecondary }}
      >
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember Me
      </label>

      <button
        type="submit"
        className="p-2 rounded-lg transition cursor-pointer font-semibold"
        style={{
          backgroundColor: theme.button.background,
          color: theme.button.text,
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.hover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.background)
        }
      >
        Sign In
      </button>
    </form>
  );
}
