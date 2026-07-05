'use client';

import { ReactNode } from 'react';

interface MockPageLayoutProps {
  title: string;
  description: string;
  icon: string;
  badge?: string;
  children: ReactNode;
}

export default function MockPageLayout({ title, description, icon, badge = 'Phase 2', children }: MockPageLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{icon}</span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h1>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
              {badge}
            </span>
          </div>
          <p className="text-gray-500 text-sm max-w-2xl">{description}</p>
        </div>
      </div>

      {/* Feature Preview Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-blue-600 text-lg">🚀</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Feature Preview</p>
            <p className="text-xs text-gray-500 mt-0.5">
              This feature is part of the NavArtha RWA roadmap. The data shown below is simulated for demonstration purposes.
              Full blockchain integration will be implemented in the next development phase.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
