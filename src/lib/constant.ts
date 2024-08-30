export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const COOKIES_ACCESS_TOKEN = "access_token";

export enum StakeDurationLock {
  ONE_MONTH = "ONE_MONTH",
  THREE_MONTH = "THREE_MONTH",
  SIX_MONTH = "SIX_MONTH",
  ONE_YEAR = "ONE_YEAR",
}

export const STAKE_DURATION_LABELS = {
  [StakeDurationLock.ONE_MONTH]: "1 Month",
  [StakeDurationLock.THREE_MONTH]: "3 Months",
  [StakeDurationLock.SIX_MONTH]: "6 Months",
  [StakeDurationLock.ONE_YEAR]: "1 Year",
};

export const STAKE_DURATION_IN_DAYS = {
  [StakeDurationLock.ONE_MONTH]: 30,
  [StakeDurationLock.THREE_MONTH]: 90,
  [StakeDurationLock.SIX_MONTH]: 180,
  [StakeDurationLock.ONE_YEAR]: 365,
};
