'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { buildRegisterBrandTx, submitTransaction } from '@/lib/stellar';
import { TxState } from '@/types';

interface RegisterBrandFormProps {
  onSuccess: () => void;
}

export default function RegisterBrandForm({ onSuccess }: RegisterBrandFormProps) {
  const { kit, publicKey, isConnected } = useWallet();
  const [brandName, setBrandName] = useState('');
  const [txState, setTxState] = useState<TxState>({ status: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !publicKey) {
      setTxState({ status: 'failed', error: 'Wallet belum terkoneksi. Silakan hubungkan wallet Anda terlebih dahulu.' });
      return;
    }
    if (!brandName.trim()) {
      setTxState({ status: 'failed', error: 'Nama brand tidak boleh kosong.' });
      return;
    }

    setTxState({ status: 'pending' });

    try {
      // 1. Build + simulate transaction
      const tx = await buildRegisterBrandTx(publicKey, brandName.trim());

      // 2. Sign via wallet kit
      let signedXdr: string;
      try {
        const result = await kit!.signTransaction(tx.toXDR(), {
          networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE,
        });
        signedXdr = result.signedTxXdr;
      } catch (signErr: any) {
        if (signErr?.message?.includes('declined') || signErr?.message?.includes('rejected')) {
          setTxState({ status: 'rejected', error: 'Transaksi ditolak oleh pengguna.' });
        } else {
          setTxState({ status: 'failed', error: signErr?.message || 'Gagal menandatangani transaksi.' });
        }
        return;
      }

      // 3. Submit to network
      const hash = await submitTransaction(signedXdr);
      setTxState({ status: 'success', hash });
      setBrandName('');
      onSuccess();
    } catch (err: any) {
      const message = err?.message || 'Terjadi kesalahan.';
      if (message.toLowerCase().includes('insufficient')) {
        setTxState({ status: 'failed', error: 'Saldo XLM tidak cukup. Isi testnet XLM via Friendbot.' });
      } else {
        setTxState({ status: 'failed', error: message });
      }
    }
  };

  const isLoading = txState.status === 'pending';

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-5">
      <h2 className="text-lg font-bold text-gray-800">Daftarkan Brand Anda</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nama Brand
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Contoh: Batik Nusantara"
            disabled={isLoading || !isConnected}
            maxLength={64}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{brandName.length}/64</p>
        </div>

        <button
          type="submit"
          disabled={isLoading || !isConnected}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Memproses...
            </>
          ) : (
            '🏷️ Register Brand'
          )}
        </button>
      </form>

      {/* Transaction Status Card */}
      {txState.status !== 'idle' && (
        <div
          className={`rounded-xl p-4 border text-sm space-y-2 ${
            txState.status === 'success'
              ? 'bg-green-50 border-green-200'
              : txState.status === 'pending'
              ? 'bg-blue-50 border-blue-200'
              : txState.status === 'rejected'
              ? 'bg-yellow-50 border-yellow-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            <span>
              {txState.status === 'success' ? '✅' :
               txState.status === 'pending' ? '⏳' :
               txState.status === 'rejected' ? '🚫' : '❌'}
            </span>
            <span className={
              txState.status === 'success' ? 'text-green-800' :
              txState.status === 'pending' ? 'text-blue-800' :
              txState.status === 'rejected' ? 'text-yellow-800' : 'text-red-800'
            }>
              {txState.status === 'success' ? 'Transaksi Berhasil' :
               txState.status === 'pending' ? 'Mengirim Transaksi...' :
               txState.status === 'rejected' ? 'Transaksi Ditolak' : 'Transaksi Gagal'}
            </span>
          </div>

          {txState.error && (
            <p className="text-xs text-red-700 mt-1">{txState.error}</p>
          )}

          {txState.status === 'success' && txState.hash && (
            <div className="space-y-1">
              <p className="text-xs font-mono text-green-700 break-all">Hash: {txState.hash}</p>
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${txState.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline font-medium"
              >
                Lihat di Stellar Expert →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
