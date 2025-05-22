'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function PrivyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{}}
    >
      {children}
    </PrivyProvider>
  );
}
