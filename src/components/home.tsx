import { useEffect, useState } from "react";
import { coin, currencies } from "../api";
import { Coin } from "../helpers/types";

export const Home = () => {
  const [trandingCoins, setTrandingCoins] = useState<Coin[]>();
  const [usd, setUsd] = useState<number>(0);
  useEffect(() => {
    const coins = coin().getTrending();
    const btcToUsd = currencies().getBtcToUsd();
    btcToUsd.then((res) => {
      setUsd(res.data.bitcoin.usd);
    });
    coins.then((res) => {
      setTrandingCoins(
        res.data.coins.map((token: any) => {
          return {
            id: token.item.coin_id,
            name: token.item.name,
            largePhoto: token.item.large,
            smallPhoto: token.item.small,
            price_btc: token.item.price_btc,
            price_usd: String(usd * token.item.price_btc),
          };
        })
      );
    });
  }, []);
  return (
    <div className="home">
      <div>Home</div>
      <div>search</div>
      <div>
        <h1>
          Top-7 trending coins on CoinGecko as searched by users in the last 24
          hours
        </h1>
        <ul>
          {trandingCoins &&
            trandingCoins.map((token) => {
              return (
                <li>
                  <img
                    src={`${token.smallPhoto}`}
                    alt={`${token.name} small photo`}
                  />
                  <div>{token.name}</div>
                  <div>{token.price_btc}</div>
                  <div>{token.price_usd}</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
