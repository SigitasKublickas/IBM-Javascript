import axios from "axios";
import { debounce } from "lodash";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { arrangedCoinItem } from "../helpers/functions";
import { Coin } from "../helpers/types";

export const SearchCoins = () => {
  const [searchedCoins, setSearchedCoins] = useState<Coin[]>();
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce(async (value) => {
    if (value === "") {
      setSearchedCoins(undefined);
    } else {
      api(axios)
        .search(value)
        .then((res) => {
          if (!res.data.success) return;

          setSearchedCoins(
            res.data.coins
              .slice(0, 20)
              .map((item: any) => arrangedCoinItem(item))
          );
        });
    }
  }, 500);
  return (
    <>
      <div className="m-4 flex items-center justify-center flex-col w-4/5">
        <div className="m-4">
          <h1 className="text-center text-3xl">Search</h1>
        </div>
        <form action="" className="search-bar flex ">
          <input
            type="search"
            name="search"
            className="text-black"
            onChange={handleInput}
            autoComplete="off"
            placeholder="Search"
          />
        </form>
      </div>
      <ul className="flex items-center justify-center flex-col gap-y-8 search-list">
        {searchedCoins &&
          searchedCoins.map((token) => {
            return (
              <li key={token.name} className="w-full">
                <Link
                  to={`/${token.id}`}
                  className="w-full flex search-list-item p-3"
                >
                  <div className="w-2/4">
                    <img
                      src={`${token.largePhoto}`}
                      alt={`${token.name}`}
                      height="50px"
                      width="50px"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    {token.name}
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
