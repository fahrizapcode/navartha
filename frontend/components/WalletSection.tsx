'use client';

import { useWallet } from '@/context/WalletContext';

export default function WalletSection() {
  const { publicKey, isConnected, isConnecting, error, connect, disconnect } = useWallet();

  const shortKey = publicKey
    ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Wallet</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            isConnected
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isConnected ? '● Connected' : '○ Disconnected'}
        </span>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-3">
          <span className="text-red-500 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-sm font-semibold text-red-700">Wallet Error</p>
            <p className="text-xs text-red-600 mt-0.5">{error}</p>
            {error.includes('install') && (
              <a
                href="https://www.freighter.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline mt-1 block"
              >
                Install Freighter →
              </a>
            )}
          </div>
        </div>
      )}

      {isConnected && publicKey ? (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-3 border border-blue-100">
            <p className="text-xs text-gray-500 mb-1">Connected Address</p>
            <p className="font-mono text-sm font-semibold text-blue-800 break-all" title={publicKey}>
              {shortKey}
            </p>
          </div>
          <button
            onClick={disconnect}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={connect}
          disabled={isConnecting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <span>🔗</span> Connect Wallet
            </>
          )}
        </button>
      )}

      <p className="text-xs text-gray-400 text-center">
        Supports Freighter, Albedo, xBull & more via StellarWalletsKit
      </p>
    </div>
  );
}
