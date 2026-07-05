'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Brand, ActivityEvent } from '@/types';
import { fetchAllBrands, fetchBrandEvents, rpcServer } from '@/lib/stellar';
import { WalletProvider } from '@/context/WalletContext';
import WalletSection from '@/components/WalletSection';
import RegisterBrandForm from '@/components/RegisterBrandForm';
import BrandList from '@/components/BrandList';
import ActivityFeed from '@/components/ActivityFeed';

function Dashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const startLedgerRef = useRef<number>(0);

  const loadBrands = useCallback(async () => {
    const data = await fetchAllBrands();
    setBrands(data);
    setBrandsLoading(false);
  }, []);

  // Initial load + setup event polling start ledger
  useEffect(() => {
    const init = async () => {
      await loadBrands();
      try {
        const latest = await rpcServer.getLatestLedger();
        startLedgerRef.current = Math.max(0, latest.sequence - 10);
      } catch {}
    };
    init();
  }, [loadBrands]);

  // Poll events every 8 seconds
  useEffect(() => {
    const poll = async () => {
      if (startLedgerRef.current === 0) return;
      const newEvents = await fetchBrandEvents(startLedgerRef.current);
      if (newEvents.length > 0) {
        setEvents((prev) => {
          const existingIds = new Set(prev.map((e) => e.id));
          const fresh = newEvents.filter((e) => !existingIds.has(e.id));
          return [...prev, ...fresh];
        });
        try {
          const latest = await rpcServer.getLatestLedger();
          startLedgerRef.current = latest.sequence;
        } catch {}
      }
    };

    const interval = setInterval(poll, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterSuccess = useCallback(() => {
    // Delay refresh to give ledger time to confirm
    setTimeout(() => {
      loadBrands();
    }, 5000);
  }, [loadBrands]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">N</span>
            </div>
            <div>
              <span className="font-black text-xl text-gray-900 tracking-tight">NavArtha</span>
              <span className="ml-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Brand Registry
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Stellar Testnet
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            NavArtha{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Brand Registry
            </span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Daftarkan brand UMKM Anda secara permanen di blockchain Stellar.
            Transparansi dan kepercayaan untuk ekosistem bisnis Indonesia.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5 text-sm">
            <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 font-medium shadow-sm">
              🔐 Soroban Smart Contract
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 font-medium shadow-sm">
              👛 Multi-Wallet Support
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 font-medium shadow-sm">
              📡 Real-time Events
            </span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Brands', value: brands.length, color: 'blue' },
            { label: 'Events Terdeteksi', value: events.length, color: 'green' },
            { label: 'Jaringan', value: 'Testnet', color: 'yellow' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`bg-white rounded-2xl p-4 border text-center shadow-sm ${
                stat.color === 'blue' ? 'border-blue-100' :
                stat.color === 'green' ? 'border-green-100' : 'border-yellow-100'
              }`}
            >
              <p className={`text-2xl font-black ${
                stat.color === 'blue' ? 'text-blue-700' :
                stat.color === 'green' ? 'text-green-600' : 'text-yellow-600'
              }`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-6">
            <WalletSection />
            <RegisterBrandForm onSuccess={handleRegisterSuccess} />
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-6">
            <BrandList brands={brands} loading={brandsLoading} />
            <ActivityFeed events={events} />
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} NavArtha · Stellar Level 2 dApp · Brand Registry MVP</p>
          <p className="mt-1">Dibangun untuk kemajuan UMKM Indonesia 🇮🇩</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <WalletProvider>
      <Dashboard />
    </WalletProvider>
  );
}
