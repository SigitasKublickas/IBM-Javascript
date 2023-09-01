import axios from "axios";
export const coin = () => {
  const search = async (input: string): Promise<any> => {
    return axios.get("https://api.coingecko.com/api/v3/search", {
      params: { query: input },
    });
  };
  const get = async (id: string) => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  };

  const getTrending = async (): Promise<any> => {
    return axios.get("https://api.coingecko.com/api/v3/search/trending");
  };

  return {
    search,
    get,
    getTrending,
  };
};
