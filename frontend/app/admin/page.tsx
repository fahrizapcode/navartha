'use client';

import { useState, useEffect, useCallback } from 'react';
import { Brand } from '@/types';
import { fetchAllBrands } from '@/lib/stellar';
import WalletSection from '@/components/WalletSection';
import BrandList from '@/components/BrandList';
import AdminGuard from '@/components/AdminGuard';

export default function AdminDashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  const loadBrands = useCallback(async () => {
    const data = await fetchAllBrands();
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

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const handleApproveSuccess = useCallback(() => {
    setTimeout(() => {
      loadBrands();
    }, 4000);
  }, [loadBrands]);

  return (
    <AdminGuard>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Approvals</h1>
          <p className="text-gray-500 mt-1">Review dan setujui pendaftaran brand baru dari pengguna.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column */}
          <div className="lg:col-span-4 space-y-6">
            <WalletSection />
          </div>

          {/* Right column */}
          <div className="lg:col-span-8 space-y-6">
            <BrandList 
              brands={brands} 
              loading={brandsLoading} 
              onApproveSuccess={handleApproveSuccess} 
              mode="pending" 
            />
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
