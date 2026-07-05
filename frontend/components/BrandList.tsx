'use client';

import { Brand } from '@/types';

interface BrandListProps {
  brands: Brand[];
  loading: boolean;
}

function shortAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
}

function formatTimestamp(ts: number): string {
  if (!ts) return '—';
  const date = new Date(ts * 1000);
  return date.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function BrandList({ brands, loading }: BrandListProps) {
  const sorted = [...brands].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Brand Terdaftar</h2>
        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
          {brands.length} Brand
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-xl" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-3">🏷️</p>
          <p className="text-sm font-medium">Belum ada brand terdaftar.</p>
          <p className="text-xs mt-1">Jadilah yang pertama mendaftarkan brand Anda!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((brand, i) => (
            <div
              key={`${brand.owner}-${brand.timestamp}-${i}`}
              className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-xl p-4 border border-blue-100 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {brand.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{brand.name}</p>
                  <p className="font-mono text-xs text-gray-500 mt-0.5" title={brand.owner}>
                    {shortAddress(brand.owner)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-right flex-shrink-0 ml-2">
                {formatTimestamp(brand.timestamp)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
