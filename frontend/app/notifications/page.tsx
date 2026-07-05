'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockNotifications } from '@/lib/mockData';

export default function NotificationsPage() {
  return (
    <MockPageLayout
      title="Notifications"
      description="Pembaruan sistem, status investasi, dan notifikasi smart contract."
      icon="🔔"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 sm:p-4">
        <div className="flex justify-between items-center px-4 py-3 mb-2 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">All Notifications</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Mark all as read
          </button>
        </div>
        
        <div className="space-y-1">
          {mockNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl flex gap-4 transition-colors ${
                notif.read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/50 border border-blue-100/50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <span className={`w-2 h-2 rounded-full inline-block ${
                  notif.type === 'success' ? 'bg-green-500' :
                  notif.type === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`}></span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{notif.time}</span>
                </div>
                <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockPageLayout>
  );
}
