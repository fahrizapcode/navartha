'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockOperators } from '@/lib/mockData';

export default function OperatorsPage() {
  return (
    <MockPageLayout
      title="Operator Management"
      description="Kelola dan audit performa operator UMKM yang menjalankan bisnis fisik RWA."
      icon="🏢"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockOperators.map((operator) => (
          <div key={operator.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{operator.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">📍 {operator.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  operator.status === 'Active' ? 'bg-green-100 text-green-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {operator.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Physical Outlets</p>
                  <p className="font-bold text-gray-900 text-xl">{operator.outlets}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Operator Rating</p>
                  <p className="font-bold text-amber-500 text-xl flex items-center gap-1">
                    ★ {operator.rating}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 col-span-2">
                  <p className="text-xs text-gray-500 mb-1">Generated Revenue (YTD)</p>
                  <p className="font-mono font-bold text-green-600 text-xl">{operator.revenue}</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 bg-white border border-gray-200 text-gray-700 font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              View Audit Reports
            </button>
          </div>
        ))}
      </div>
    </MockPageLayout>
  );
}
