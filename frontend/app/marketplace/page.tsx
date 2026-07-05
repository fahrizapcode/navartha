'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockMarketplace } from '@/lib/mockData';

export default function MarketplacePage() {
  return (
    <MockPageLayout
      title="RWA Token Marketplace"
      description="Pasar sekunder untuk memperjualbelikan kepemilikan token RWA dari bisnis UMKM yang didanai."
      icon="🛒"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-gray-900">Live Trading Data (Testnet)</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search tokens..." 
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Asset / Token</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">24h Change</th>
                <th className="px-6 py-4">24h Volume</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockMarketplace.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium">{item.price}</td>
                  <td className={`px-6 py-4 font-mono font-bold ${
                    item.change.startsWith('+') && item.change !== '+0.0%' ? 'text-green-600' :
                    item.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {item.change}
                  </td>
                  <td className="px-6 py-4 font-mono text-gray-500">{item.volume}</td>
                  <td className="px-6 py-4">
                    <button 
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={item.volume === '$0'}
                    >
                      Trade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MockPageLayout>
  );
}
