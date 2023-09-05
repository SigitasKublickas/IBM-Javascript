import axios, { Axios } from "axios";
export const APIURL = "http://localhost:8000";
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
  return {
    getTrandingCoins,
    search,
    getCoin,
    getBtcToUsd,
  };
};
