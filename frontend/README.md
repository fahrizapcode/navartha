This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📸 Screenshots

### 1. 🔗 Wallet Connected & Brand Registration

Users connect their Stellar wallet using **StellarWalletsKit**, which supports Freighter, Albedo, xBull, and other popular Stellar wallets. Once connected, the brand registration form becomes available. The form includes input validation and prepares a Soroban smart contract transaction for submission.

![Wallet Connected & Brand Registration Form](public/connectwallet-brandform.png)

---

### 2. ⏳ Transaction Pending

After submitting the registration form, the application enters a loading state while the transaction is signed by the connected wallet and submitted to the Stellar Testnet. During this phase, the submit button is disabled and a loading indicator is displayed to reflect the pending transaction status.

![Transaction Pending](public/tx-pending.png)

---

### 3. ✅ Transaction Success

Once the transaction is confirmed on-chain, the UI displays a success message along with the transaction hash. A direct link to **Stellar Expert** is provided so users can independently verify the transaction on the blockchain.

![Transaction Success](public/tx-success.png)

---

### 4. 📋 Registered Brands & Activity Feed

The frontend fetches all registered brands directly from the deployed Soroban smart contract via Stellar RPC. Every successful brand registration emits a `BrandRegistered` event, which is captured and displayed in the real-time activity feed.

![Registered Brands & Activity Feed](public/brandregistered-feed.png)

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
