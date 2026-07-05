'use client';

import { ActivityEvent } from '@/types';

interface ActivityFeedProps {
  events: ActivityEvent[];
}

function shortHash(hash: string): string {
  if (!hash || hash.length < 12) return hash;
  return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
}

function formatTime(ts: number): string {
  const date = new Date(ts * 1000);
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  const sortedEvents = [...events].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">Live Activity Feed</h2>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
        </div>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">Menunggu aktivitas baru dari smart contract...</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {sortedEvents.map((event) => {
            const isApproval = event.type === 'BrandApproved';
            
            return (
              <div key={event.id} className="flex gap-3 text-sm">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isApproval ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {isApproval ? '✅' : '⚡'}
                  </div>
                  <div className="w-px h-full bg-gray-100 mt-2"></div>
                </div>
                
                <div className="flex-1 pb-4">
                  <p className="font-medium text-gray-900">
                    Brand <span className="font-bold text-blue-600">{event.brandName}</span>
                    {isApproval ? ' telah di-approve' : ' berhasil didaftarkan'}
                  </p>
                  
                  {isApproval && event.approver ? (
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      By: {shortHash(event.approver)}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1 font-mono">
                      Owner: {shortHash(event.owner)}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-400">{formatTime(event.timestamp)}</p>
                    {event.txHash && (
                      <a
                        href={`https://stellar.expert/explorer/testnet/tx/${event.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:text-blue-700 font-mono"
                      >
                        {shortHash(event.txHash)} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
