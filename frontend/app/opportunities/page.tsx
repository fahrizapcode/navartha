'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockOpportunities } from '@/lib/mockData';

export default function OpportunitiesPage() {
  return (
    <MockPageLayout
      title="Investment Opportunities"
      description="Eksplorasi peluang investasi Real World Asset (RWA) pada bisnis UMKM terverifikasi di Indonesia."
      icon="💎"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOpportunities.map((opp) => (
          <div key={opp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded-md">
                  {opp.category}
                </span>
                <h3 className="font-bold text-gray-900 mt-2 text-lg">{opp.name}</h3>
                <p className="text-gray-500 text-xs mt-1">📍 {opp.location}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                opp.status === 'Open' ? 'bg-green-100 text-green-700' :
                opp.status === 'Funded' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {opp.status}
              </span>
            </div>
            
            <div className="space-y-3 mt-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Min. Investment</span>
                <span className="font-mono font-medium text-gray-900">{opp.minInvestment}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Expected Return (APY)</span>
                <span className="font-medium text-green-600">{opp.expectedReturn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Risk Profile</span>
                <span className="font-medium text-gray-900">{opp.risk}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-gray-900 text-white font-medium py-2.5 rounded-xl hover:bg-gray-800 transition-colors text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </MockPageLayout>
  );
}
