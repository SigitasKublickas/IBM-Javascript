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
  return {
    getTrandingCoins,
    search,
    getCoin,
    getBtcToUsd,
    searchedCoins,
    selectedCoins,
  };
};
