"use client";

import Button from "../common/Button";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  return (
    <Button variant="primary" onClick={() => router.push("/login")}>
      Login
    </Button>
  );
}
