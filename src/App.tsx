import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "./components/home";
import { Skeleton } from "./components/skeleton";
import { Coin } from "./components/coin";
import { useEffect } from "react";
import { SetName } from "./components/setName";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("name") == null) {
      navigate("/set");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Skeleton />}>
        <Route index element={<Home />} />
        <Route path="/set" element={<SetName />} />
        <Route path="/crypto/:id" element={<Coin />} />
      </Route>
    </Routes>
  );
}

export default App;
