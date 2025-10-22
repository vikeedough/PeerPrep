"use client";

import { useEffect, useState } from "react";
import { mockCheckLogin } from "../../../../lib/mockApi";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function RightActions() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = mockCheckLogin();
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="ml-auto flex items-center gap-4">
      {isLoggedIn ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}
