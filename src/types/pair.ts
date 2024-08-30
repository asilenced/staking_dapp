export interface DexScreenerResponse {
  schemaVersion: string;
  pairs: Pair[];
  pair: Pair;
}

export interface Pair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels: string[];
  baseToken: BaseToken;
  quoteToken: BaseToken;
  priceNative: string;
  priceUsd: string;
  txns: Txns;
  volume: Volume;
  priceChange: Volume;
  liquidity: Liquidity;
  fdv: number;
  pairCreatedAt: number;
  info: Info;
}

export interface Info {
  imageUrl: string;
  websites: Website[];
  socials: Social[];
}

export interface Social {
  type: string;
  url: string;
}

export interface Website {
  label: string;
  url: string;
}

export interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

export interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

export interface Txns {
  m5: M5;
  h1: M5;
  h6: M5;
  h24: M5;
}

export interface M5 {
  buys: number;
  sells: number;
}

export interface BaseToken {
  address: string;
  name: string;
  symbol: string;
}

export interface Epoch {
  id: string,
  rewards: string,
  epochend:string
}