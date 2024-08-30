"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMemo } from "react";
import { erc20Abi, formatUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useSignMessage,
} from "wagmi";
import { Button } from "../ui/button";

export const VPSConnectButton = () => {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: balance } = useReadContract({
    address: process.env.NEXT_PUBLIC_VPS_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    abi: erc20Abi,
    args: [address as `0x${string}`],
    account: address,
  });


  const balanceDisplay = useMemo(() => {
    if (!balance) return "0";
    const _balance = formatUnits(balance ?? BigInt(0), 18);
    const _balanceInt = parseInt(_balance);
    return _balanceInt.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  }, [balance]);
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                    className="gap-2 !hidden"
                    variant="ghost"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <Button onClick={openAccountModal} size="sm" type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
