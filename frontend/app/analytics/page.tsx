'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockAnalytics } from '@/lib/mockData';

export default function AnalyticsPage() {
  return (
    <MockPageLayout
      title="Analytics Dashboard"
      description="Insight dan data statistik keseluruhan platform NavArtha."
      icon="📈"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Investors', value: mockAnalytics.totalInvestors, sub: 'Verified users' },
          { label: 'Total Assets', value: mockAnalytics.totalAssets, sub: 'Tokenized properties' },
          { label: 'Total Invested', value: mockAnalytics.totalInvested, sub: 'Platform TVL' },
          { label: 'Avg ROI', value: mockAnalytics.avgReturn, sub: 'Historical average' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Monthly Revenue Distribution (Mock Chart)</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            {mockAnalytics.monthlyRevenue.map((data, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-blue-100 group-hover:bg-blue-600 transition-colors rounded-t-sm"
                  style={{ height: `${(data.value / 26000) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Asset Distribution</h3>
          <div className="space-y-4">
            {mockAnalytics.assetDistribution.map((data, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{data.category}</span>
                  <span className="font-bold text-gray-900">{data.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full" 
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MockPageLayout>
  );
}
