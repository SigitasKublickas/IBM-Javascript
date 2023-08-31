import { Coin, TrendingCoin } from "./types";

export const arrangedTrandingCoinItem = (
  token: any,
  usd: number
): TrendingCoin => {
  return {
    id: token.item.coin_id,
    name: token.item.name,
    largePhoto: token.item.large,
    smallPhoto: token.item.small,
    price_btc: token.item.price_btc,
    price_usd: String(usd * token.item.price_btc),
  };
};
export const arrangedCoinItem = (token: any): Coin => {
  return {
    id: token.coin_id,
    name: token.name,
    largePhoto: token.large,
    smallPhoto: token.thumb,
  };
};
