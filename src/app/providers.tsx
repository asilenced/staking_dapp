"use client";

import { config } from "@app/lib/ethereum/wagmi";
import { NextUIProvider } from "@nextui-org/system";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { Toaster } from "@app/components/ui/sonner";
import { AlertDialogProvider } from "@app/components/ui/alert-dialog-provider";
import { toast } from "sonner";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { TooltipProvider } from "@app/components/ui/tooltip";

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <NextUIProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: "#64DFAC",
              accentColorForeground: "#070707",
            })}
          >
            <TooltipProvider>
              <AlertDialogProvider>
                <>{props.children}</>
                <Toaster
                  richColors
                  className="z-[60]"
                  toastOptions={{
                    classNames: {
                      toast: "z-[60]",
                    },
                  }}
                />
              </AlertDialogProvider>
            </TooltipProvider>
            {/* {<ReactQueryDevtools initialIsOpen={false} />} */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
