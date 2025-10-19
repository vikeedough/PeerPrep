"use client";

import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { mockCheckLogin } from "../../../lib/mockApi";
import TopNavBar from "../components/layout/TopNavBar";
import LoginCard from "../components/auth/LoginCard";
import LoadingOverlay from "../components/common/LoadingOverlay";
import { useTheme } from "../../../context/ThemeContext";
import { LoggedInUser, checkLogin } from "../../../lib/auth";


export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    checkLogin().then((user: LoggedInUser | null) => {
      if (user) {
        console.log("Auto-login as:", user.email);
        router.push("/problems");
      }
    });
  }, [router]);

  return (
    <>
      <main
        className="min-h-screen flex flex-col relative"
        style={{
          backgroundColor: theme.background,
          color: theme.text,
        }}
      >
        {loading && <LoadingOverlay />}

        <TopNavBar />

        <section className="flex flex-1 items-center justify-center">
          <LoginCard loading={loading} setLoading={setLoading} />
        </section>
      </main>
    </>
  );
}
