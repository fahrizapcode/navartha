'use client';

import MockPageLayout from '@/components/MockPageLayout';
import { mockProfile } from '@/lib/mockData';

export default function ProfilePage() {
  return (
    <MockPageLayout
      title="Profile"
      description="Kelola data pribadi, status KYC, dan keamanan akun Anda."
      icon="👤"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-md">
              {mockProfile.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{mockProfile.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{mockProfile.role}</p>
            <div className="mt-6 pt-6 border-t border-gray-100 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Member since</span>
                <span className="font-medium text-gray-900">{mockProfile.joinDate}</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">KYC Status</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase">
                  {mockProfile.kycStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                <input type="text" disabled value={mockProfile.name} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                <input type="email" disabled value={mockProfile.email} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Connected Wallet</label>
                <input type="text" disabled value={mockProfile.walletAddress} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-mono text-gray-700" />
              </div>
            </div>
            <button className="mt-6 bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </MockPageLayout>
  );
}
