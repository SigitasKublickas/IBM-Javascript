import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { coin, currencies } from "../api";
import { arrangedTrandingCoinItem } from "../helpers/functions";
import { TrendingCoin } from "../helpers/types";

export const TrandingCoins = () => {
  const [trandingCoins, setTrandingCoins] = useState<TrendingCoin[]>();
  const [items, setItems] = useState<any>();
  const [usd, setUsd] = useState<number>(0);
  useEffect(() => {
    const btcToUsd = currencies().getBtcToUsd();
    btcToUsd.then((res) => {
      setUsd(res.data.bitcoin.usd);
    });
  }, []);

  useEffect(() => {
    const coins = coin().getTrending();
    coins.then((res: any) => {
      setTrandingCoins(
        res.data.coins.map((token: any) => arrangedTrandingCoinItem(token, usd))
      );
    });
  }, [usd]);

  useEffect(() => {
    if (!trandingCoins) return;
    setItems(
      trandingCoins.map((token) => {
        return (
          <div className="carousel-item flex align-center flex-col">
            <img
              src={`${token.smallPhoto}`}
              alt={`${token.name}`}
              height="30px"
              width="30px"
            />
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
          </div>
        );
      })
    );
  }, [trandingCoins]);
  return (
    <div className="flex items-center justify-center w-full flex-col ">
      <h1 className="text-center sm:text-2xl p-12">
        Top-7 trending coins on CoinGecko as searched by users in the last 24
        hours
      </h1>
      <div className="w-2/4">
        <AliceCarousel
          mouseTracking
          items={items}
          autoPlayInterval={5000}
          autoPlay={true}
          infinite={true}
          autoWidth={false}
          responsive={{
            0: {
              items: 1,
            },
            1024: {
              items: 3,
              itemsFit: "contain",
            },
          }}
        />
      </div>
    </div>
  );
};
