"use client";

import { Button, buttonVariants } from "@app/components/ui/button";
import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import LockedContent from "@app/components/ui/locked-content";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@app/components/ui/select";
import { Switch } from "@app/components/ui/switch";
import { STAKE_DURATION_LABELS, StakeDurationLock } from "@app/lib/constant";
import { cn } from "@app/lib/utils";
import { SelectValue } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { format, getQuarter } from "date-fns";
import {
  ArrowUp,
  BadgeCheckIcon,
  BanknoteIcon,
  CircleDollarSignIcon,
  DollarSignIcon,
  LineChartIcon,
  ReceiptIcon,
  RotateCwIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";
import { useMemo } from "react";
import { erc20Abi, formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";

type VPSInfoResponse = {
  marketCap: number;
  price: string;
  circulatingSupply: number;
  totalSupply: number;
  volume: number;
  liquidity: number;
  priceChange: number;
};
export default function HoldersAreaPage() {
  const { data } = useQuery<VPSInfoResponse>({
    queryKey: ["vps-stats"],
    queryFn: async () => {
      const response = await fetch("/api/vps/stats");
      return response.json();
    },
  });
  const { address } = useAccount();

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
    <div className="flex flex-col gap-4 p-4 pt-[72px]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <BadgeCheckIcon size={24} className="text-primary" />
          <div className="text-lg md:text-2xl font-bold">VPS AI Staking</div>
        </div>
        <div className="text-muted-foreground">
          Stake your $VPS tokens and become part of a profit-sharing ecosystem. By staking your $VPS, you&apos;ll secure a share of our quarterly profits. Stay informed with the latest market data and insights as you enjoy passive income from your staked tokens.
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col space-y-4 md:w-[480px] min-h-[560px]">
          <div className="p-4 rounded-lg border space-y-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <BanknoteIcon size={16} className="text-primary" />
                <div className="text-sm text-primary">Total Value Staked</div>
              </div>
              <LockedContent>
                <div className="text-2xl font-medium select-none">
                  {/* {(35135932 * parseFloat(data?.price || "0")).toLocaleString(
                  "en-US",
                  {
                    maximumFractionDigits: 0,
                    currency: "USD",
                    style: "currency",
                  }
                )}{" "} */}
                  Coming Soon USD
                  <div className="text-sm text-muted-foreground select-none font-medium">
                    {/* {(35135932).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}{" "} */}
                    Coming Soon
                    VPS
                  </div>
                </div>
              </LockedContent>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <UsersIcon size={16} className="text-primary" />
                <LockedContent>
                  <div className="text-base font-medium select-none">Coming Soon</div>
                </LockedContent>
                <div className="text-sm text-primary">Stakers</div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg border space-y-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <WalletIcon size={16} className="text-primary" />
                <div className="text-sm text-primary">My Balance</div>
              </div>
              <div className="text-2xl font-medium">
                {balanceDisplay} VPS
                <div className="text-sm text-muted-foreground font-medium">
                  {(
                    parseFloat(balanceDisplay) * parseFloat(data?.price || "0")
                  ).toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                    currency: "USD",
                    style: "currency",
                  })}{" "}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <WalletIcon size={16} className="text-primary" />
                <div className="text-sm text-primary">My Staked Balance</div>
              </div>
              <div className="text-2xl font-medium">
                {(0).toLocaleString("en-US", {
                  maximumFractionDigits: 4,
                })}{" "} VPS
                <div className="text-sm text-muted-foreground font-medium">
                  {(0 * parseFloat(data?.price || "0")).toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 0,
                      currency: "USD",
                      style: "currency",
                    }
                  )}{" "}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a
                href="https://app.uniswap.org/swap?outputCurrency=0x00b78238925c320159023c2ac9ef89da8f16d007"
                className={buttonVariants({
                  size: "sm",
                  variant: "secondary",
                  className: "w-full",
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy VPS
              </a>
            </div>
          </div>
          <div className="p-4 rounded-lg border space-y-6">
            <div className="space-y-1">
              <div className="font-medium">Stake Your $VPS</div>
              <p className="text-muted-foreground text-sm">
                Stake your $VPS to join the revenue sharing program and earn passive
                income.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="space-y-1">
                <Label className="text-muted-foreground">Enter Amount</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="0.0" disabled />
                  <div className="text-muted-foreground">VPS</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center justify-between">
                <div>Your VPS balance</div>
                <div>{balanceDisplay} $VPS</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch disabled id="lock-token" />
              <Label htmlFor="lock-token">Lock Token</Label>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Lock Duration</Label>
              <Select disabled defaultValue={StakeDurationLock.ONE_MONTH}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Operating System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(StakeDurationLock)?.map((duration) => {
                      return (
                        <SelectItem key={duration} value={duration}>
                          <div>{STAKE_DURATION_LABELS[duration]}</div>
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" disabled>
              Stake
            </Button>
          </div>
        </div>
        <div className="space-y-4 w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 h-fit flex-1 p-4 rounded-lg border">
            <div className="flex flex-col gap-1 h-fit">
              <div className="flex items-center gap-1">
                <LineChartIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">Market Cap</div>
              </div>
              <div className="text-base font-medium">
                {data?.marketCap.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1 h-fit">
              <div className="flex items-center gap-1">
                <DollarSignIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">Price</div>
              </div>
              <div
                className={cn("text-base flex items-center gap-2 font-medium", {
                  "text-green-500": (data?.priceChange || 0) > 0,
                  "text-red-500": (data?.priceChange || 0) < 0,
                  "text-white": (data?.priceChange || 0) === 0,
                })}
              >
                {parseFloat(data?.price || "0").toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 6,
                })}
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-full pl-1 pr-1 py-[2px] w-fit text-xs font-medium",
                    {
                      "bg-green-500 bg-opacity-25":
                        (data?.priceChange || 0) > 0,
                      "bg-red-500 bg-opacity-25": (data?.priceChange || 0) < 0,
                    }
                  )}
                >
                  <ArrowUp
                    size={14}
                    className={cn({
                      "text-green-500": (data?.priceChange || 0) > 0,
                      "text-red-500": (data?.priceChange || 0) < 0,
                      "text-white": (data?.priceChange || 0) === 0,
                      "rotate-180": (data?.priceChange || 0) < 0,
                    })}
                  />
                  {data?.priceChange || 0}%
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 h-fit">
              <div className="flex items-center gap-1">
                <RotateCwIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">
                  Circulating Supply
                </div>
              </div>
              <div className="text-base font-medium">
                {data?.circulatingSupply.toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                })}{" "}
                VPS
              </div>
            </div>
            <div className="flex flex-col gap-1 h-fit">
              <div className="flex items-center gap-1">
                <CircleDollarSignIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">Revenue</div>
              </div>
              <div className="text-base font-medium">
                {/* {(75931).toLocaleString("en-US", {
                  maximumFractionDigits: 0,
                  currency: "USD",
                  style: "currency",
                })} */}
                <LockedContent>
                  Calculating
                </LockedContent>
              </div>
            </div>
            <div className="flex flex-col gap-1 h-fit">
              <div className="flex items-center gap-1">
                <ReceiptIcon size={16} className="text-primary" />
                <div className="text-sm text-muted-foreground">Next Payout</div>
              </div>
              <div className="text-base font-medium">
                Q{getQuarter(new Date("2024-06-30"))} {format(new Date("2024-06-30"), "MMM dd, yyyy")}

              </div>
            </div>
          </div>
          <div
            id="dexscreener-embed"
            className="min-h-[800px] md:min-h-0 rounded-lg border overflow-hidden"
          >
            <iframe src="https://dexscreener.com/ethereum/0xfAD44DC24D07eF9Be576D562B994F19578D441b8?embed=1&theme=dark&info=0"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
