'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockInvestors } from '@/lib/mockData';

export default function InvestorsPage() {
  return (
    <MockPageLayout
      title="Private Investors"
      description="Kelola dan pantau investor privat (High Net Worth Individuals & Institutional) yang berpartisipasi dalam ekosistem NavArtha."
      icon="👥"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Investor Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Portfolio Value</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockInvestors.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      {inv.avatar}
                    </div>
                    {inv.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{inv.type}</td>
                  <td className="px-6 py-4 font-mono font-medium text-gray-900">{inv.portfolio}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      inv.status === 'Active' ? 'bg-green-100 text-green-700' :
                      inv.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{inv.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MockPageLayout>
  );
}
