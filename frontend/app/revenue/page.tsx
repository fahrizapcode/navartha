'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockRevenue } from '@/lib/mockData';

export default function RevenuePage() {
  return (
    <MockPageLayout
      title="Revenue Sharing"
      description="Distribusi pendapatan (yield) dari operator bisnis UMKM kepada pemegang token RWA menggunakan smart contract."
      icon="💰"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900">Revenue Distribution History</h3>
            <p className="text-sm text-gray-500 mt-1">Laporan bagi hasil per kuartal</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Total Revenue</th>
                <th className="px-6 py-4">Your Share</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockRevenue.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-gray-500">{rev.date}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{rev.asset}</td>
                  <td className="px-6 py-4 text-gray-600">{rev.period}</td>
                  <td className="px-6 py-4 font-mono text-gray-500">{rev.revenue}</td>
                  <td className="px-6 py-4 font-mono font-bold text-green-600">{rev.share}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rev.status === 'Distributed' ? 'bg-green-100 text-green-700' :
                      rev.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {rev.status}
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
