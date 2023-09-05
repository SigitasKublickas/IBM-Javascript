import { Coin, TrendingCoin } from "./types";

export const arrangedTrandingCoinItem = (
  token: any,
  usd: number
): TrendingCoin => {
  return {
    id: token.item.id,
    name: token.item.name,
    largePhoto: token.item.large,
    smallPhoto: token.item.small,
    price_btc: token.item.price_btc,
    price_usd: String(usd * token.item.price_btc),
  };
};
export const arrangedCoinItem = (token: any): Coin => {
  return {
    id: token.id,
    name: token.name,
    largePhoto: token.large,
    smallPhoto: token.thumb,
  };
};

export const formatDateWithHours = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
export const findMinMax = (
  arr: number[]
): { min: number | undefined; max: number | undefined } => {
  if (arr.length === 0) {
    return { min: undefined, max: undefined }; // Handle empty array
  }

  const min = Math.min(...arr);
  const max = Math.max(...arr);

  return { min, max };
};
