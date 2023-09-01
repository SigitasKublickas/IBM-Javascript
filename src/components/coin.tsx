import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { coin } from "../api";
import { Diagram } from "./diagram";

export const Coin = () => {
  const params = useParams();
  useEffect(() => {
    if (params && params.id) {
      coin()
        .get(params.id)
        .then((res) => console.log(res));
    }
  }, []);
  return (
    <div className="coin">
      <div>{params.id}</div>
      <div style={{ marginTop: "200px" }}>
        {params.id && <Diagram id={params.id} />}
      </div>
    </div>
  );
};
