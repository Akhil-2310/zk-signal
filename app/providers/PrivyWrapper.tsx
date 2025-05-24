"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#FFFFFF",
          showWalletLoginFirst: true,
          logo: "https://auth.privy.io/logos/privy-logo.png",
          walletChainType: "ethereum-only",
          walletList: ["detected_wallets", "metamask", "phantom"],
        },
        loginMethods: ["wallet"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
