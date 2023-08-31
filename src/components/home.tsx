import { useEffect, useState } from "react";
import { coin } from "../api";
import { Coin } from "../helpers/types";

export const Home = () => {
  const [trandingCoins, setTrandingCoins] = useState<Coin[]>();
  useEffect(() => {
    const coins = coin().getTrending();
    coins.then((res) => {
      setTrandingCoins(
        res.data.coins.map((token: any) => {
          return {
            id: token.item.coin_id,
            name: token.item.name,
            largePhoto: token.item.large,
            smallPhoto: token.item.small,
            price_btc: token.item.price_btc,
          };
        })
      );
    });
  }, []);
  return (
    <div className="home">
      <div>Home</div>
      <div>
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
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
