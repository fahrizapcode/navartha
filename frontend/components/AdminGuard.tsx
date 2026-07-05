'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isConnected, isAdmin } = useWallet();

  useEffect(() => {
    if (!isConnected || !isAdmin) {
      router.replace('/');
    }
  }, [isConnected, isAdmin, router]);

  if (!isConnected) {
    return (
      <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-900">Wallet belum terhubung</h2>
        <p className="mt-2 text-sm text-yellow-700">Silakan connect wallet yang terdaftar sebagai admin untuk mengakses halaman ini.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-3xl border border-red-300 bg-red-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-red-900">Unauthorized</h2>
        <p className="mt-2 text-sm text-red-700">Anda tidak memiliki akses ke halaman admin.</p>
      </div>
    );
  }

  return <>{children}</>;
}
