'use client';

import { ActivityEvent } from '@/types';

interface ActivityFeedProps {
  events: ActivityEvent[];
}

function shortAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
}

function timeAgo(ts: number): string {
  if (!ts) return 'just now';
  const diff = Math.floor(Date.now() / 1000 - ts);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Activity Feed</h2>
        <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </span>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-3xl mb-2">📡</p>
          <p className="text-sm">Menunggu event dari kontrak...</p>
          <p className="text-xs mt-1">Daftarkan brand untuk memulai aktivitas.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {[...events].reverse().map((ev) => (
            <div
              key={ev.id}
              className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-3 hover:border-green-300 transition-colors"
            >
              <span className="text-green-500 text-lg mt-0.5">🟢</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">
                  New Brand Registered
                </p>
                <p className="text-xs text-gray-700 mt-0.5">
                  <span className="font-bold">{ev.brandName}</span>
                  {' '}by{' '}
                  <span className="font-mono" title={ev.owner}>{shortAddress(ev.owner)}</span>
                </p>
                {ev.txHash && (
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${ev.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:underline mt-0.5 block truncate"
                  >
                    {ev.txHash.slice(0, 20)}...
                  </a>
                )}
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(ev.timestamp)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
