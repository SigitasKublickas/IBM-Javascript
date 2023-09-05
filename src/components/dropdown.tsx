import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { arrangedCoinItem } from "../helpers/functions";
import { Coin } from "../helpers/types";

export const Dropdown = () => {
  const [searchedCoins, setSearchedCoins] = useState<Coin[]>();
  const [value, setValue] = useState<string>("");

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
    setValue(e.target.value);
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
  useEffect(() => {
    if (value == "") {
      setSearchedCoins(undefined);
    }
  });
  return (
    <>
      <div className="m-4 flex items-center justify-center flex-col">
        <div className="dropdown">
          <input
            className="text-black text-bold dropdown-search w-full"
            onChange={handleInput}
            autoComplete="off"
            placeholder="Search"
            maxLength={30}
            value={value}
          />
          <div
            className={`dropdown-content flex-col gap-y-2 ${
              searchedCoins ? "flex" : "none"
            }`}
          >
            {searchedCoins?.length == 0 && (
              <div className="dropdown-content-item-empty flex">
                No record found
              </div>
            )}
            {searchedCoins &&
              searchedCoins.map((token) => {
                return (
                  <Link
                    to={`/${token.id}`}
                    className="dropdown-content-item flex"
                    onClick={() => setValue("")}
                  >
                    <div className="w-2/4">
                      <img
                        src={`${token.largePhoto}`}
                        alt={`${token.name}`}
                        height="50px"
                        width="50px"
                      />
                    </div>
                    <div className="flex items-center justify-center text-black">
                      {token.name}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};
