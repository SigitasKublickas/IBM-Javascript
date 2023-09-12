import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  findMinMax,
  formatDate,
  formatDateWithHours,
  formatHours,
  isDexadecimal,
} from "../helpers/functions";

import "react-calendar/dist/Calendar.css";
import OutsideAlerter from "./outclick";
import { api } from "../api";
import axios from "axios";
import { id } from "date-fns/locale";
type Props = {
  id: string;
};
type TollTipTypes = {
  active?: boolean;
  payload?: any;
  label?: any;
};
export const Diagram = (props: Props) => {
  const [minMax, setMinMax] = useState<
    { min: number; max: number } | undefined
  >();
  const [expandFrom, setExpandFrom] = useState<boolean>(false);
  const [expandTo, setExpandTo] = useState<boolean>(false);
  const [from, setFrom] = useState<number | undefined>();
  const [to, setTo] = useState<number | undefined>();
  const [days, setDays] = useState<number>(7);
  const [chartData, setChartData] =
    useState<{ date: string; value: string }[]>();

  useEffect(() => {
    if (!chartData) return;
    const values = chartData.map((item) => {
      return Number(item.value);
    });
    setMinMax(findMinMax(values));
  }, [chartData]);
  useEffect(() => {
    if (days === 0) return;
    api(axios)
      .fetchFromUrl(
        `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${days}`
      )
      .then((res) => {
        setChartData(
          res.prices.map((item: any[]) => {
            return {
              date:
                days === 1
                  ? formatHours(new Date(item[0]))
                  : formatDateWithHours(new Date(item[0])),
              value: isDexadecimal(item[1])
                ? Number(item[1].toFixed(2))
                : new Number(item[1]).toFixed(12),
            };
          })
        );
      })
      .catch(alert);
  }, [days, props.id]);
  useEffect(() => {
    if (from && to && from < to) {
      console.log("suveikia2");
      if (from > to) {
        alert("The start date must be less than the end date!");
        setTo(undefined);
        setDays(7);
      } else {
        setDays(0);
        api(axios)
          .fetchFromUrl(
            `https://api.coingecko.com/api/v3/coins/${
              props.id
            }/market_chart/range?vs_currency=usd&from=${from / 1000}&to=${
              to / 1000
            }`
          )
          .then((res) => {
            if (!res) return;
            setChartData(
              res.prices.map((item: any[]) => {
                return {
                  date: formatDateWithHours(new Date(item[0])),
                  value: isDexadecimal(item[1])
                    ? Number(item[1].toFixed(2))
                    : new Number(item[1]).toFixed(12),
                };
              })
            );
          });
      }
    }
  }, [from, to, props.id]);

  const FromDateToUnix = (value: any) => {
    const date = new Date(value);
    const today = new Date();
    if (date.getTime() > today.getTime()) {
      alert("The date must be less than today!");
    } else {
      if (!expandFrom && from && from > date.getTime()) {
        alert("The start date must be less than the end date!");
      } else {
        setExpandFrom(false);
        setExpandTo(false);
        expandFrom ? setFrom(date.getTime()) : setTo(date.getTime());
      }
    }
  };

  const CustomTooltip = (props: TollTipTypes) => {
    if (props.active) {
      return (
        <div>
          <p>{props.label}</p>
          <p>${props.payload[0].value}</p>
        </div>
      );
    }

    return null;
  };
  const MiniCalendar = () => {
    if (expandFrom || expandTo) {
      return (
        <div className="calendar">
          <Calendar onChange={FromDateToUnix} className="text-black" />
        </div>
      );
    }
  };
  console.log(minMax);
  if (!chartData) {
    return <></>;
  }
  return (
    <div>
      <div className="mt-40 xl:mt-12 flex gap-y-4 gap-x-2 w-full range-graph p-2 md:gap-x-4 mb-12 flex-col md:flex-row">
        <div
          className={`range-graph-item w-full flex items-center justify-center md:w-3/12 ${
            days === 1 && "active"
          }`}
          onClick={() => {
            setDays(1);
            setFrom(undefined);
            setTo(undefined);
          }}
        >
          1
        </div>
        <div
          className={`range-graph-item w-full flex items-center justify-center md:w-3/12 ${
            days === 7 && "active"
          }`}
          onClick={() => {
            setDays(7);
            setFrom(undefined);
            setTo(undefined);
          }}
        >
          7
        </div>
        <div
          className={`range-graph-item w-full flex items-center justify-center md:w-3/12 ${
            days === 30 && "active"
          }`}
          onClick={() => {
            setDays(30);
            setFrom(undefined);
            setTo(undefined);
          }}
        >
          30
        </div>
        <OutsideAlerter
          style={"w-full flex items-center justify-center md:w-3/12 relative"}
          outclick={() => {
            setExpandFrom(false);
            setExpandTo(false);
          }}
        >
          {MiniCalendar()}
          <div
            className="range-graph-item-custom-item w-2/4 flex items-center justify-center flex-col"
            onClick={() => {
              setExpandFrom(true);
              setExpandTo(false);
            }}
          >
            {from ? formatDate(new Date(from)) : "From"}
          </div>
          <div
            className="range-graph-item-custom-item w-2/4 flex items-center justify-center flex-col"
            onClick={() => {
              setExpandTo(true);
              setExpandFrom(false);
            }}
          >
            {to ? formatDate(new Date(to)) : "To"}
          </div>
        </OutsideAlerter>
      </div>
      {chartData && (
        <ResponsiveContainer height={400}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2451B7" stopOpacity="0.4"></stop>
                <stop
                  offset="75%"
                  stopColor="#2451B7"
                  stopOpacity="0.05"
                ></stop>
              </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickCount={24}
              tickFormatter={(str, index) => {
                if (days === 1) {
                  return str;
                } else {
                  if (index % 24 === 0) {
                    const date = parseISO(str.slice(0, 10));
                    return formatDate(date);
                  } else {
                    return "";
                  }
                }
              }}
            />

            <YAxis
              dataKey="value"
              tickCount={14}
              tickFormatter={(number) => {
                console.log(number.toFixed(2));
                return `$${number.toFixed(2)}`;
              }}
              domain={
                minMax
                  ? [
                      Number(minMax.min.toFixed(2)),
                      Number(minMax.max.toFixed(2)),
                    ]
                  : undefined
              }
            />

            <Tooltip
              content={
                <CustomTooltip
                  active={true}
                  payload={undefined}
                  label={undefined}
                />
              }
            />
            <CartesianGrid opacity="0.2" vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
