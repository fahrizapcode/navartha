'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockProfile } from '@/lib/mockData';

export default function SettingsPage() {
  return (
    <MockPageLayout
      title="Settings"
      description="Konfigurasi preferensi aplikasi, notifikasi, dan pengaturan jaringan."
      icon="⚙️"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl">
        
        {/* Network Settings */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Network Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Current Network</p>
                <p className="text-xs text-gray-500">Select the Stellar network you want to connect to.</p>
              </div>
              <select disabled className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 outline-none">
                <option>Stellar Testnet</option>
                <option>Stellar Mainnet</option>
                <option>Futurenet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
                <p className="text-xs text-gray-500">Require 2FA for sensitive actions like transferring assets.</p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input type="checkbox" checked={mockProfile.twoFactor} readOnly className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-blue-500 appearance-none cursor-pointer translate-x-6" />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"></label>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Email Notifications</h3>
          <div className="space-y-3">
            {[
              { label: 'Investment Updates', checked: true },
              { label: 'Revenue Distribution', checked: true },
              { label: 'Governance Votes', checked: false },
              { label: 'Marketing & News', checked: false },
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-not-allowed opacity-70">
                <input type="checkbox" checked={item.checked} readOnly className="w-4 h-4 text-blue-600 rounded border-gray-300 pointer-events-none" />
                <span className="text-sm text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
          
          <button className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
            Save Changes
          </button>
        </div>

      </div>
    </MockPageLayout>
  );
}
