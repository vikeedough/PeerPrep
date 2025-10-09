"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockLogin, mockCheckLogin } from "../../../lib/mockApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Auto redirect if user is already logged in
  useEffect(() => {
    const user = mockCheckLogin();
    if (user) {
      console.log("Auto-login as:", user.name);
      router.push("/problems");
    }
  }, [router]);

  // Handle Login
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
      await new Promise((res) => setTimeout(res, 500)); // simulate backend delay

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
    <main className="min-h-screen bg-gray-100 flex flex-col relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mb-4"></div>
            <p className="text-gray-700 font-medium">Signing in...</p>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="w-full bg-white shadow-sm p-4 flex items-center">
        <div
          className="font-bold text-2xl cursor-pointer"
          onClick={() => {
            const user = mockCheckLogin();
            if (user) {
              console.log("Auto-login as:", user.name);
              router.push("/problems");
            } else {
              router.push("/login"); 
            }
          }}
        >
          [ PeerPrep Logo ]
        </div>
      </header>

      {/* Login Container */}
      <section className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96 relative">
          <div className="flex flex-col items-center mb-4">
            <div className="text-xl font-semibold mb-2">[ PeerPrep Logo ]</div>
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          </div>

          <form onSubmit={handleLogin} noValidate className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className={`border rounded-lg p-2 ${
                invalidFields.includes("email") ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className={`border rounded-lg p-2 ${
                invalidFields.includes("password") ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>

          {/* Bottom Options */}
          <div className="flex justify-between text-sm mt-3">
            <button className="text-blue-500 hover:underline cursor-pointer">
              Forgot Password?
            </button>
            <button className="text-blue-500 hover:underline cursor-pointer">
              Sign Up
            </button>
          </div>

          {/* Social Login */}
          <div className="text-center mt-6">
            <p className="text-gray-500 mb-2">or sign in with</p>
            <div className="flex justify-center gap-6">
              <div className="cursor-pointer text-gray-700 hover:text-blue-500">
                <i className="fa-brands fa-google text-2xl"></i>
              </div>
              <div className="cursor-pointer text-gray-700 hover:text-gray-900">
                <i className="fa-brands fa-github text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
