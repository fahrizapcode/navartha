'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Brand, ActivityEvent } from '@/types';
import { fetchAllBrands, fetchBrandEvents, rpcServer } from '@/lib/stellar';
import WalletSection from '@/components/WalletSection';
import RegisterBrandForm from '@/components/RegisterBrandForm';
import BrandList from '@/components/BrandList';
import ActivityFeed from '@/components/ActivityFeed';

export default function Home() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const startLedgerRef = useRef<number>(0);

  const loadBrands = useCallback(async () => {
    const data = await fetchAllBrands();
    // Deduplicate by owner, prioritizing 'Approved' over 'Pending'
    const brandMap = new Map<string, Brand>();
    for (const b of data) {
      const key = `${b.owner}-${b.name}`;
      const existing = brandMap.get(key);
      if (!existing || b.status === 'Approved') {
        brandMap.set(key, b);
      }
    }
    setBrands(Array.from(brandMap.values()));
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

  const handleApproveSuccess = useCallback(() => {
    setTimeout(() => {
      loadBrands();
    }, 4000);
  }, [loadBrands]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 mt-1">Daftarkan brand dan pantau status persetujuan di jaringan Stellar.</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Brands', value: brands.length, color: 'blue' },
          { label: 'Approved Brands', value: brands.filter(b => b.status === 'Approved').length, color: 'green' },
          { label: 'Pending Approvals', value: brands.filter(b => b.status === 'Pending').length, color: 'yellow' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl p-5 border text-left shadow-sm ${
              stat.color === 'blue' ? 'border-blue-100' :
              stat.color === 'green' ? 'border-green-100' : 'border-amber-100'
            }`}
          >
            <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${
              stat.color === 'blue' ? 'text-blue-700' :
              stat.color === 'green' ? 'text-green-600' : 'text-amber-600'
            }`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column */}
        <div className="lg:col-span-5 space-y-6">
          <WalletSection />
          <RegisterBrandForm onSuccess={handleRegisterSuccess} />
        </div>

        {/* Right column */}
        <div className="lg:col-span-7 space-y-6">
          <BrandList brands={brands} loading={brandsLoading} onApproveSuccess={handleApproveSuccess} />
          <ActivityFeed events={events} />
        </div>
      </div>
    </div>
  );
}
