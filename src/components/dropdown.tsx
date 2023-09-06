import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { arrangedCoinItem } from "../helpers/functions";
import { Coin } from "../helpers/types";
import { InputDialog } from "./inputDialog";

export const Dropdown = () => {
  const [searchedCoins, setSearchedCoins] = useState<Coin[]>();
  const [value, setValue] = useState<string>("");

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (value == "") {
      setSearchedCoins(undefined);
    }
  }, [value]);

  const onSeacrh = (val: string) => {
    api(axios)
      .searchedCoins(`${localStorage.getItem("name")}`, val)
      .then(console.log);
  };

  const onSelect = (selected: string) => {
    api(axios)
      .selectedCoins(`${localStorage.getItem("name")}`, selected)
      .then(console.log);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value === "") {
      setSearchedCoins(undefined);
    } else {
      onSeacrh(value);
      fetch(
        "https://api.coingecko.com/api/v3/search?" +
          new URLSearchParams({ query: value })
      )
        .then((res) => res.json())
        .then((res) => {
          if (!res.coins) return;
          setSearchedCoins(
            res.coins.slice(0, 20).map((item: any) => arrangedCoinItem(item))
          );
        });
    }
  };

  return (
    <>
      <div className="m-4 flex items-center justify-center flex-col">
        <div className="dropdown">
          <form
            className="flex flex-col w-full gap-y-2"
            onSubmit={handleSubmit}
          >
            {value.length == 30 && (
              <InputDialog text="Do not exceed 30 characters!" />
            )}
            <input
              className="text-black text-bold dropdown-search w-full"
              onChange={handleInput}
              autoComplete="off"
              placeholder="Search"
              maxLength={30}
              value={value}
              disabled={localStorage.getItem("name") == null ? true : false}
            />
            <input type="submit" value="Submit" className="button" />
          </form>
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
                    to={`/crypto/${token.id}`}
                    className="dropdown-content-item flex"
                    onClick={() => {
                      setValue("");
                      onSelect(token.id);
                    }}
                    key={token.id}
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
