'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../../../../lib/auth';

export default function LogoutButton({
  className = '',
}: {
  className?: string;
}) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout(); // calls supabase.auth.signOut()
      router.push('/login'); // redirect after logout
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <button
      onClick={handleLogout}
      className={`bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition ${className}`}
    >
      Log Out
    </button>
  );
}
