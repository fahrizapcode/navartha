'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockPortfolio } from '@/lib/mockData';

export default function PortfolioPage() {
  return (
    <MockPageLayout
      title="My Portfolio"
      description="Pantau aset RWA yang Anda miliki, performa nilai, dan tokenisasi dari aset UMKM yang didanai."
      icon="📊"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-md">
          <p className="text-gray-400 text-sm font-medium mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-black font-mono">$25,120</p>
          <p className="text-green-400 text-sm mt-2 font-medium">▲ +$2,120 (9.2%) All time</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">Active Assets</p>
          <p className="text-3xl font-black text-gray-900">3</p>
          <p className="text-gray-400 text-sm mt-2">Tokenized RWA</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm font-medium mb-1">Total Yield Earned</p>
          <p className="text-3xl font-black text-green-600 font-mono">$885</p>
          <p className="text-gray-400 text-sm mt-2">In stablecoins</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Token ID</th>
                <th className="px-6 py-4">Invested</th>
                <th className="px-6 py-4">Current Value</th>
                <th className="px-6 py-4">Return</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockPortfolio.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.asset}</td>
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 bg-blue-50/50 rounded">{item.tokenId}</td>
                  <td className="px-6 py-4 font-mono text-gray-600">{item.invested}</td>
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">{item.currentValue}</td>
                  <td className="px-6 py-4 font-medium text-green-600">{item.return}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {item.status}
                    </span>
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
