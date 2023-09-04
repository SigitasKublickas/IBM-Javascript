import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { Diagram } from "./diagram";

export const Coin = () => {
  const params = useParams();
  useEffect(() => {
    if (params && params.id) {
      api(axios).getCoin(params.id).then(console.log);
    }
  });
  return (
    <div className="coin">
      <div>{params.id}</div>
      <div style={{ marginTop: "200px" }}>
        {params.id && <Diagram id={params.id} />}
      </div>
    </div>
  );
};
