"use client";

import { useState } from "react";
import { useTheme } from "../../../../context/ThemeContext";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import AuthFooter from "./AuthFooter";

interface LoginCardProps {
  loading: boolean;
  setLoading: (v: boolean) => void;
}

export default function LoginCard({ loading, setLoading }: LoginCardProps) {
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  return (
    <div
      className="p-8 rounded-2xl shadow-md w-96 border"
      style={{
        backgroundColor: theme.card.background,
        borderColor: theme.border,
        boxShadow: theme.card.shadow,
      }}
    >
      <div className="flex flex-col items-center mb-4">
        <div className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
          [ PeerPrep Logo ]
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: theme.accent }}>
          Login
        </h1>
      </div>

      <LoginForm
        setLoading={setLoading}
        setError={setError}
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields} 
      />

      {error && <p className="text-sm text-center mt-2" style={{ color: theme.error }}>{error}</p>}
      <AuthFooter />
      <SocialLogin />
    </div>
  );
}
