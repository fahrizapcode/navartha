export const ADMIN_WALLET_ADDRESSES = (process.env.NEXT_PUBLIC_ADMIN_WALLETS || '')
  .split(',')
  .map((address) => address.trim())
  .filter(Boolean);

export const DEFAULT_ADMIN_WALLETS = [
  'GD6JTR4XCNEDVIO5XRJCIPRYYN336WDAZ7IH7ZI3PQQLKDECSYABKQCC',
];

export const getAdminWallets = () => {
  return ADMIN_WALLET_ADDRESSES.length > 0 ? ADMIN_WALLET_ADDRESSES : DEFAULT_ADMIN_WALLETS;
};

export function isAdminWallet(publicKey: string | null | undefined): boolean {
  if (!publicKey || typeof publicKey !== 'string') return false;
  const normalized = publicKey.trim().toUpperCase();
  return getAdminWallets().some((adminKey) => adminKey.toUpperCase() === normalized);
}
