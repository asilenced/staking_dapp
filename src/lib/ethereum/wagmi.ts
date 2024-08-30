import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string;

export const config = getDefaultConfig({
  appName: "VPSAI",
  projectId,
  chains: [sepolia],
  ssr: true,
});
