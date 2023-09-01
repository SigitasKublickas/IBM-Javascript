import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "../helpers/functions";
type Props = {
  id: string;
};
export const Diagram = (props: Props) => {
  const [chartData, setChartData] =
    useState<{ date: string; value: string }[]>();
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=7`
    )
      .then((data) => data.json())
      .then((res) => {
        setChartData(
          res.prices.map((item: any[]) => {
            return {
              date: formatDate(new Date(item[0])),
              value: item[1].toFixed(4),
            };
          })
        );
      });
  }, []);
  console.log(chartData);
  return (
    <div>
      <ResponsiveContainer width="80%" height={400}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity="0.4"></stop>
              <stop offset="75%" stopColor="#2451B7" stopOpacity="0.05"></stop>
            </linearGradient>
          </defs>

          <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickFormatter={(str) => {
              const date = parseISO(str.slice(0, 10));
              return String(date);
            }}
          />

          <YAxis
            dataKey="value"
            tickCount={8}
            tickFormatter={(number) => `$${number}`}
          />

          <Tooltip />
          <CartesianGrid opacity="0.2" vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
