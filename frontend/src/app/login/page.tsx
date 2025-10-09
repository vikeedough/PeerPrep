"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockLogin, mockCheckLogin } from "../../../lib/mockApi";
import { useTheme } from "../../../context/ThemeContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  // Auto redirect if user is already logged in
  useEffect(() => {
    const user = mockCheckLogin();
    if (user) {
      console.log("Auto-login as:", user.name);
      router.push("/problems");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInvalidFields([]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (!email.trim()) {
      setError("⚠️ Email field cannot be empty.");
      setInvalidFields(["email"]);
      return;
    }

    if (!password.trim()) {
      setError("⚠️ Password field cannot be empty.");
      setInvalidFields(["password"]);
      return;
    }

    if (!isEmailValid) {
      setInvalidFields(["email"]);
      setError("❌ Please enter a valid email address.");
      return;
    }

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
    <main
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Loading Overlay */}
      {loading && (
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
      )}

      {/* Top Navigation Bar */}
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
            if (user) {
              console.log("Auto-login as:", user.name);
              router.push("/problems");
            } else {
              router.push("/login");
            }
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

      {/* Login Container */}
      <section className="flex flex-1 items-center justify-center">
        <div
          className="p-8 rounded-2xl shadow-md w-96 border"
          style={{
            backgroundColor: theme.card.background,
            borderColor: theme.border,
            boxShadow: theme.card.shadow,
          }}
        >
          <div className="flex flex-col items-center mb-4">
            <div
              className="text-xl font-semibold mb-2"
              style={{ color: theme.text }}
            >
              [ PeerPrep Logo ]
            </div>
            <h1
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: theme.accent }}
            >
              Login
            </h1>
          </div>

          <form
            onSubmit={handleLogin}
            noValidate
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="rounded-lg p-2 focus:outline-none"
              style={{
                backgroundColor: theme.input.background,
                color: theme.input.text,
                border: `1px solid ${
                  invalidFields.includes("email")
                    ? theme.error
                    : theme.input.border
                }`,
                ["--placeholder-color" as any]: theme.input.placeholder,
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="rounded-lg p-2 focus:outline-none"
              style={{
                backgroundColor: theme.input.background,
                color: theme.input.text,
                border: `1px solid ${
                  invalidFields.includes("password")
                    ? theme.error
                    : theme.input.border
                }`,
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Remember Me */}
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

            {/* Error */}
            {error && (
              <p
                className="text-sm text-center"
                style={{ color: theme.error }}
              >
                {error}
              </p>
            )}

            {/* Submit Button */}
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
                (e.currentTarget.style.backgroundColor =
                  theme.button.background)
              }
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* Bottom Options */}
          <div className="flex justify-between text-sm mt-3">
            <button
              className="cursor-pointer transition"
              style={{ color: theme.primary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = theme.primary)
              }
            >
              Forgot Password?
            </button>
            <button
              className="cursor-pointer transition"
              style={{ color: theme.primary }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.accent)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = theme.primary)
              }
            >
              Sign Up
            </button>
          </div>

          {/* Social Login */}
          <div className="text-center mt-6">
            <p
              className="mb-2"
              style={{ color: theme.textSecondary }}
            >
              or sign in with
            </p>
            <div className="flex justify-center gap-6">
              <div
                className="cursor-pointer transition"
                style={{ color: theme.text }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = theme.primary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.text)
                }
              >
                <i className="fa-brands fa-google text-2xl"></i>
              </div>
              <div
                className="cursor-pointer transition"
                style={{ color: theme.text }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = theme.primary)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.text)
                }
              >
                <i className="fa-brands fa-github text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
