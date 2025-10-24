"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import TopNavBar from "../components/layout/TopNavBar";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { useTheme } from "../../../context/ThemeContext";
import { signUp } from "../../../lib/auth";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { theme } = useTheme();

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signUp(email, password);
            router.push("/login");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

  // skeleton frontend, need to add other user details later
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form
        onSubmit={handleSignup}
        className="bg-surface shadow-lg rounded-lg p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:bg-gray-300"
        >
          {loading ? 'Creating...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center mt-2 text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </main>
  );
}