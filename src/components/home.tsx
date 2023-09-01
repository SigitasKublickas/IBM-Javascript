import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { coin, currencies } from "../api";
import { Coin, TrendingCoin } from "../helpers/types";
import {
  arrangedCoinItem,
  arrangedTrandingCoinItem,
} from "../helpers/functions";

export const Home = () => {
  const [trandingCoins, setTrandingCoins] = useState<TrendingCoin[]>();
  const [searchedCoins, setSearchedCoins] = useState<Coin[]>();
  const [usd, setUsd] = useState<number>(0);

  useEffect(() => {
    const coins = coin().getTrending();
    const btcToUsd = currencies().getBtcToUsd();
    btcToUsd.then((res) => {
      setUsd(res.data.bitcoin.usd);
    });
    coins.then((res) => {
      setTrandingCoins(
        res.data.coins.map((token: any) => arrangedTrandingCoinItem(token, usd))
      );
    });
  }, []);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce(async (value) => {
    const searched = await coin().search(value);
    console.log(value);
    if (value == "") {
      setSearchedCoins(undefined);
    } else {
      setSearchedCoins(
        searched.data.coins
          .slice(0, 20)
          .map((item: any) => arrangedCoinItem(item))
      );
    }
  }, 500);
  return (
    <div className="home">
      <div className="m-12 flex items-center justify-center flex-col ">
        <div className="m-4">Search</div>
        <div className="p-4">
          <input type="text" onChange={handleInput} />
        </div>
      </div>
      <div className="flex items-center justify-center flex-col gap-y-8">
        <h1 className="text-center sm:text-3xl">
          Top-7 trending coins on CoinGecko as searched by users in the last 24
          hours
        </h1>
        <ul className="flex items-center justify-center flex-col gap-y-8">
          {searchedCoins &&
            searchedCoins.map((token) => {
              return (
                <li
                  key={token.id}
                  className="w-full flex items-center justify-center"
                >
                  <img
                    src={`${token.largePhoto}`}
                    alt={`${token.name}`}
                    height="50px"
                    width="50px"
                  />
                  <div>{token.name}</div>
                </li>
              );
            })}
          {trandingCoins &&
            !searchedCoins &&
            trandingCoins.map((token) => {
              return (
                <li key={token.id}>
                  <img src={`${token.smallPhoto}`} alt={`${token.name}`} />
                  <div>{token.name}</div>
                  <div>
                    {token.price_btc}
                    <img
                      src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
                      alt="btc"
                      width="20px"
                      height="20px"
                    />
                  </div>
                  <div>{token.price_usd} $</div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
