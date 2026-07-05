'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navSections = [
  {
    label: 'CORE',
    items: [
      { name: 'Brand Registry', href: '/', icon: '🏷️' },
    ],
  },
  {
    label: 'INVESTMENT',
    items: [
      { name: 'Private Investors', href: '/investors', icon: '👥', badge: 'Phase 2' },
      { name: 'Opportunities', href: '/opportunities', icon: '💎', badge: 'Phase 2' },
      { name: 'Portfolio', href: '/portfolio', icon: '📊', badge: 'Phase 2' },
      { name: 'Revenue Sharing', href: '/revenue', icon: '💰', badge: 'Phase 2' },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { name: 'Admin Approvals', href: '/admin', icon: '✅', badge: 'Admin' },
      { name: 'Operators', href: '/operators', icon: '🏢', badge: 'Phase 2' },
      { name: 'Marketplace', href: '/marketplace', icon: '🛒', badge: 'Phase 2' },
    ],
  },
  {
    label: 'INSIGHTS',
    items: [
      { name: 'Analytics', href: '/analytics', icon: '📈', badge: 'Phase 2' },
      { name: 'Notifications', href: '/notifications', icon: '🔔', badge: 'Phase 2' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { name: 'Profile', href: '/profile', icon: '👤', badge: 'Phase 2' },
      { name: 'Settings', href: '/settings', icon: '⚙️', badge: 'Phase 2' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-gray-300 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-lg">N</span>
          </div>
          <div>
            <span className="font-black text-lg text-white tracking-tight">NavArtha</span>
            <span className="block text-[10px] text-gray-500 font-medium -mt-0.5">RWA Platform · MVP</span>
          </div>
        </Link>
      </div>

      {/* Network Badge */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs bg-gray-800/60 border border-gray-700 px-3 py-2 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
          <span className="text-gray-400 font-medium">Stellar Testnet</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold text-gray-600 tracking-widest uppercase">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] font-bold bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded-md uppercase">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800">
        <p className="text-[10px] text-gray-600 text-center">
          © 2024 NavArtha · Stellar dApp
        </p>
      </div>
    </aside>
  );
}
