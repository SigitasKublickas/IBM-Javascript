import axios from "axios";
export const coin = () => {
  const search = async (input: string): Promise<any> => {
    return axios.get("https://api.coingecko.com/api/v3/search", {
      params: { query: input },
    });
  };
  const get = async (id: string) => {};

  const getTrending = async (): Promise<any> => {
    return axios.get("https://api.coingecko.com/api/v3/search/trending");
  };

  return {
    search,
    get,
    getTrending,
  };
};
