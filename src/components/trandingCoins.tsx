import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { api } from "../api";
import { arrangedTrandingCoinItem } from "../helpers/functions";
import { TrendingCoin } from "../helpers/types";
const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
export const TrandingCoins = () => {
  const [trandingCoins, setTrandingCoins] = useState<TrendingCoin[]>();
  const [items, setItems] = useState<any>();
  const [usd, setUsd] = useState<number>(0);
  useEffect(() => {
    api(axios)
      .getBtcToUsd()
      .then((res) => {
        setUsd(res.data.usd);
      });
  }, []);

  useEffect(() => {
    api(axios)
      .getTrandingCoins()
      .then((res: any) => {
        if (!res.data.success) return;
        setTrandingCoins(
          res.data.coins.map((token: any) =>
            arrangedTrandingCoinItem(token, usd)
          )
        );
      });
  }, [usd]);

  useEffect(() => {
    if (!trandingCoins) return;
    setItems(
      trandingCoins.map((token) => {
        return (
          <Link
            to={token.id}
            className="carousel-item flex items-center justify-center flex-col"
          >
            <div className="w-4/5 h-full flex items-center justify-cente flex-col">
              <img
                src={`${token.smallPhoto}`}
                alt={`${token.name}`}
                className="w-full md:w-3/5 mt-8"
              />
              <div className="p-2 text-2xl font-bold">{token.name}</div>
              <div className="flex">
                <img
                  src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
                  alt="btc"
                  width="15px"
                />
                <div className="text-xs md:text-lg">
                  {Number(token.price_btc).toFixed(8)}
                </div>
              </div>
              <div className="text-xs flex p-2 md:text-lg">
                <span>$</span>
                {Number(token.price_usd).toFixed(8)}
              </div>
            </div>
          </Link>
        );
      })
    );
  }, [trandingCoins]);
  return (
    <div className="flex items-center justify-center w-full flex-col ">
      <h1 className="text-6xl p-4 font-bold mt-5">Cryplet</h1>
      <h1 className="text-lg  text-center md:text-3xl p-12">
        Top-7 trending coins on CoinGecko as searched by users in the last 24
        hours
      </h1>
      <div className="w-2/4">
        <AliceCarousel
          items={items}
          // autoPlayInterval={5000}
          // autoPlay={true}
          infinite={true}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </div>
    </div>
  );
};
