import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { Diagram } from "./diagram";

export const Coin = () => {
  const [coin, setCoin] = useState<{
    marketCap: number;
    circulatingSup: number;
    priceUsd: number;
    priceBtc: number;
    img: string;
    name: string;
    symbol: string;
  }>();
  const params = useParams();
  useEffect(() => {
    if (params && params.id) {
      api(axios)
        .getCoin(params.id)
        .then((item: any) => {
          setCoin({
            img: item.data.coin.image.thumb,
            name: item.data.coin.name,
            symbol: item.data.coin.symbol,
            priceUsd: item.data.coin.market_data.current_price.usd,
            priceBtc: item.data.coin.market_data.current_price.btc,
            circulatingSup: item.data.coin.market_data.circulating_supply,
            marketCap: item.data.coin.market_data.market_cap.usd,
          });
        });
    }
  }, [params.id]);
  return (
    <div className="coin">
      <div className="flex flex-col gap-y-4 mt-8">
        <div className="flex items-center gap-x-5">
          <img src={coin?.img} alt={coin?.name} width="50" />
          <div className="font-bold">{coin?.name}</div>
          <div className="opacity-50">{coin?.symbol}</div>
        </div>
        <div>${coin?.priceUsd.toFixed(8)}</div>
        <div className="flex">{coin?.priceBtc.toFixed(8)} BTC</div>
        <div>Circulating Supply: {coin?.circulatingSup}</div>
        <div>Market Cap: {coin?.marketCap}</div>
      </div>
      <div className="mt-12">{params.id && <Diagram id={params.id} />}</div>
    </div>
  );
};
