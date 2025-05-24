"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { createWalletClient, custom } from 'viem'
import { celoAlfajores } from 'viem/chains'
import { Identity } from '@semaphore-protocol/identity'

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { login, logout, authenticated, ready } = usePrivy();
  const { wallets } = useWallets();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);

  const handleConnect = async () => {
    if (!authenticated) {
      await login();
    }
  };

  const handleDisconnect = async () => {
    await logout();
    setWalletAddress(null);
    setIdentity(null);
    sessionStorage.removeItem("semaphore-signature");
  };

  useEffect(() => {
  const generateIdentity = async () => {
    if (!ready) return;

    if (!authenticated) {
      setWalletAddress(null);
      setIdentity(null);
      return;
    }

    const storedSig = sessionStorage.getItem("semaphore-signature");
    if (storedSig && wallets.length > 0) {
      const id = new Identity(storedSig);
      setIdentity(id);

      const wallet = wallets[0];
      const provider = await wallet.getEthereumProvider();
      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(provider),
      });

      const [address] = await client.getAddresses();
      setWalletAddress(address);
      return;
    }

    if (wallets.length > 0) {
      const wallet = wallets[0];
      const provider = await wallet.getEthereumProvider();
      const client = createWalletClient({
        chain: celoAlfajores,
        transport: custom(provider),
      });

      const [address] = await client.getAddresses();
      setWalletAddress(address);

      const message = `Sign to generate Semaphore identity for ZKSignals (${address})`;
      const signature = await client.signMessage({ account: address, message });

      sessionStorage.setItem("semaphore-signature", signature);
      const id = new Identity(signature);
      setIdentity(id);
    }
  };

  generateIdentity();
}, [authenticated, ready, wallets]);


  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-emerald-600 rounded-md flex items-center justify-center text-white font-bold">
                ZK
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">ZKSignals</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/app/groups/create" className="nav-link">Create Group</Link>
              <Link href="/app/groups" className="nav-link">All Groups</Link>
              <Link href="/app/my-groups" className="nav-link">My Groups</Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {!walletAddress ? (
              <button
                onClick={handleConnect}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 transition-all transform hover:-translate-y-0.5"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{shortAddress}</span>
                  <button
                    onClick={handleDisconnect}
                    className="ml-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Disconnect
                  </button>
                </div>
                {identity && (
                  <span className="text-xs text-gray-500">Commitment: {identity.commitment.toString()}</span>
                )}
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
