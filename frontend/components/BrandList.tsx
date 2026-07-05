'use client';

import { useState } from 'react';
import { Brand } from '@/types';
import { useWallet } from '@/context/WalletContext';
import { buildApproveBrandTx, submitTransaction } from '@/lib/stellar';

interface BrandListProps {
  brands: Brand[];
  loading: boolean;
  onApproveSuccess: () => void;
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

export default function BrandList({ brands, loading, onApproveSuccess }: BrandListProps) {
  const { kit, publicKey, isConnected } = useWallet();
  const [approvingKey, setApprovingKey] = useState<string | null>(null);

  const sorted = [...brands].sort((a, b) => b.timestamp - a.timestamp);

  const handleApprove = async (ownerToApprove: string, brandName: string) => {
    if (!isConnected || !publicKey) return;
    
    const key = `${ownerToApprove}-${brandName}`;
    setApprovingKey(key);
    
    try {
      const tx = await buildApproveBrandTx(publicKey, ownerToApprove, brandName);
      
      const result = await kit!.signTransaction(tx.toXDR(), {
        networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE,
      });
      
      await submitTransaction(result.signedTxXdr);
      onApproveSuccess();
    } catch (err) {
      console.error("Approval failed:", err);
      alert("Failed to approve brand. See console for details.");
    } finally {
      setApprovingKey(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Brand Terdaftar</h2>
        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
          {brands.length}
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-20 bg-gray-50 rounded-xl" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-3xl mb-2">🏷️</p>
          <p className="text-sm font-medium text-gray-700">Belum ada brand terdaftar.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {sorted.map((brand, i) => (
            <div
              key={`${brand.owner}-${brand.timestamp}-${i}`}
              className="bg-white rounded-xl p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group flex items-start justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm">
                  {brand.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-900">{brand.name}</p>
                    {brand.status === 'Approved' ? (
                      <span className="flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wider">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Verified
                      </span>
                    ) : (
                      <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200 uppercase tracking-wider">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs text-gray-500 mt-1" title={brand.owner}>
                    Owner: {shortAddress(brand.owner)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatTimestamp(brand.timestamp)}
                  </p>
                </div>
              </div>

              {brand.status === 'Pending' && (
                <button
                  onClick={() => handleApprove(brand.owner, brand.name)}
                  disabled={!isConnected || approvingKey === `${brand.owner}-${brand.name}`}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-lg border border-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {approvingKey === `${brand.owner}-${brand.name}` ? 'Approving...' : 'Approve'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
