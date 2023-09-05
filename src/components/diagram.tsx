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
import { formatDate, formatDateWithHours } from "../helpers/functions";
type Props = {
  id: string;
};
type TollTipTypes = {
  active?: boolean;
  payload?: any;
  label?: any;
};
export const Diagram = (props: Props) => {
  const [minMax, setMinMax] = useState<{ min: number; max: number }>();
  const [chartData, setChartData] =
    useState<{ date: string; value: string }[]>();
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=7`
    )
      .then((data) => data.json())
      .then((res) => {
        if (res.error) return undefined;
        setChartData(
          res.prices.map((item: any[]) => {
            return {
              date: formatDateWithHours(new Date(item[0])),
              value: item[1].toFixed(4),
            };
          })
        );
      });
  }, []);
  // useEffect(() => {
  //   const prices = chartData?.value.map((item) => Number(item));
  //   setMinMax();
  // }, [chartData]);
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
  if (!chartData) {
    return <div>Klaida!</div>;
  }
  return (
    <div>
      <ResponsiveContainer height={400}>
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
            tickFormatter={(str, index) => {
              if (index % 24 === 0) {
                const date = parseISO(str.slice(0, 10));
                return formatDate(date);
              } else {
                return "";
              }
            }}
          />

          <YAxis
            dataKey="value"
            tickCount={8}
            tickFormatter={(number) => `$${number}`}
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
    </div>
  );
};
