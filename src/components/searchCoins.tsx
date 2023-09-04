import { debounce } from "lodash";
import { useState } from "react";
import { Link } from "react-router-dom";
import { coin } from "../api";
import { arrangedCoinItem } from "../helpers/functions";
import { Coin } from "../helpers/types";

export const SearchCoins = () => {
  const [searchedCoins, setSearchedCoins] = useState<Coin[]>();
  const [value, setValue] = useState<string>("");
  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce(async (value) => {
    const searched = await coin().search(value);
    if (value === "") {
      setSearchedCoins(undefined);
    } else {
      setSearchedCoins(
        searched.data.coins
          .slice(0, 20)
          .map((item: any) => arrangedCoinItem(item))
      );
    }
  }, 500);
  return (
    <>
      <div className="m-12 flex items-center justify-center flex-col ">
        <div className="m-4">
          <h1 className="text-center sm:text-3xl">Search</h1>
        </div>
        <div className="p-4">
          <input
            type="text"
            onChange={handleInput}
            value={value}
            className="text-black"
          />
        </div>
      </div>
      <ul className="flex items-center justify-center flex-col gap-y-8 search-list">
        {searchedCoins &&
          searchedCoins.map((token) => {
            return (
              <li key={token.id} className="w-full">
                <Link
                  to={token.name}
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
