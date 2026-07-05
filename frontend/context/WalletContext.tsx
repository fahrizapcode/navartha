'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { StellarWalletsKit, WalletNetwork, allowAllModules, FREIGHTER_ID } from '@creit.tech/stellar-wallets-kit';

interface WalletContextType {
  kit: StellarWalletsKit | null;
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | null>(null);

let walletKitInstance: StellarWalletsKit | null = null;

function getWalletKit(): StellarWalletsKit {
  if (!walletKitInstance) {
    walletKitInstance = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: FREIGHTER_ID,
      modules: allowAllModules(),
    });
  }
  return walletKitInstance;
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kit] = useState<StellarWalletsKit>(() => getWalletKit());

  const connect = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      await kit.openModal({
        onWalletSelected: async (option) => {
          kit.setWallet(option.id);
          try {
            const { address } = await kit.getAddress();
            setPublicKey(address);
          } catch {
            setError('Gagal mendapatkan alamat wallet.');
          }
        },
      });
    } catch (e: any) {
      if (e?.message?.includes('User declined')) {
        setError('Koneksi wallet ditolak oleh pengguna.');
      } else if (e?.message?.includes('not installed')) {
        setError('Freighter Wallet tidak terdeteksi. Silakan install terlebih dahulu.');
      } else {
        setError(e?.message || 'Gagal menghubungkan wallet.');
      }
    } finally {
      setIsConnecting(false);
    }
  }, [kit]);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setError(null);
  }, []);

  return (
    <WalletContext.Provider
      value={{ kit, publicKey, isConnected: !!publicKey, isConnecting, error, connect, disconnect }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}
