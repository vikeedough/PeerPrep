"use client";

import Button from "../common/Button";
import { useRouter } from "next/navigation";
import { mockLogout } from "../../../../lib/mockApi"; 

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    mockLogout();
    router.push("/login");
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}
