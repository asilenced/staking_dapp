import { DexScreenerResponse } from "@app/types/pair";
import { createPublicClient, erc20Abi, formatUnits, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

const publicClient = createPublicClient({
  chain: sepolia,
  // transport: http("https://mainnet.infura.io/v3/63179dce8cd145118734cfe8fc809926"),
  transport: http(),
});

const url =
  "https://api.dexscreener.com/latest/dex/pairs/ethereum/0xfAD44DC24D07eF9Be576D562B994F19578D441b8";
const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const UNCX_TOKEN_LOCKER = "0x663a5c229c09b049e36dcc11a9b0d4a8eb9db214";
const UNCX_TOKEN_VESTING = "0xdba68f07d1b7ca219f78ae8582c213d975c25caf";

 const GET = async (req: Request) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await response.json()) as DexScreenerResponse;

  const balanceOfLock = await publicClient.readContract({
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_VPS_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [UNCX_TOKEN_LOCKER],
  });

  const balanceOfDead = await publicClient.readContract({
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_VPS_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [DEAD_ADDRESS],
  });

  const balanceOfVesting = await publicClient.readContract({
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_VPS_ADDRESS as `0x${string}`,
    functionName: "balanceOf",
    args: [UNCX_TOKEN_VESTING],
  });

  const totalSupply = await publicClient.readContract({
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_VPS_ADDRESS as `0x${string}`,
    functionName: "totalSupply",
  });

  const circulatingSupply =
    totalSupply - balanceOfLock - balanceOfDead - balanceOfVesting;

  const decimals = await publicClient.readContract({
    abi: erc20Abi,
    address: process.env.NEXT_PUBLIC_VPS_ADDRESS as `0x${string}`,
    functionName: "decimals",
  });

  const circulatingSupplyFormatted = parseFloat(
    formatUnits(circulatingSupply, decimals)
  );

  const result = {
    marketCap: data.pair.fdv,
    price: data.pair.priceUsd,
    circulatingSupply: circulatingSupplyFormatted,
    totalSupply: parseFloat(formatUnits(totalSupply, decimals)),
    volume: data.pair.volume.h24,
    liquidity: data.pair.liquidity.usd,
    priceChange: data.pair.priceChange.h24,
  };
  return Response.json(result);
};
