import axios, { Axios } from "axios";
export const APIURL = "https://ibm-backend-tnu5.onrender.com";
export const api = (axios: Axios) => {
  const getTrandingCoins = async (): Promise<any> => {
    return axios.get(`${APIURL}/getTrandingCoins`);
  };
  const search = async (input: string): Promise<any> => {
    return axios.post(`${APIURL}/search`, { input });
  };
  const getCoin = async (id: string): Promise<any> => {
    return axios.post(`${APIURL}/getCoin`, { id });
  };
  const getBtcToUsd = async (): Promise<any> => {
    return axios.get(`${APIURL}/getBtcToUsd`);
  };
  const searchedCoins = async (
    name: string,
    searched: String
  ): Promise<any> => {
    return axios.post(`${APIURL}/searchedCoins`, { name, searched });
  };
  const selectedCoins = async (
    name: string,
    selected: String
  ): Promise<any> => {
    return axios.post(`${APIURL}/selectedCoins`, { name, selected });
  };
  const fetchFromUrl = async (url: string) => {
    try {
      const response = await fetch(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    fetchFromUrl,
    getTrandingCoins,
    search,
    getCoin,
    getBtcToUsd,
    searchedCoins,
    selectedCoins,
  };
};
