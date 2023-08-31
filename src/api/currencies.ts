import axios from "axios";

export const currencies = () => {
  const getBtcToUsd = async () => {
    return axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );
  };
  return {
    getBtcToUsd,
  };
};
