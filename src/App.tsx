import { Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { Skeleton } from "./components/skeleton";
import { Coin } from "./components/coin";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Skeleton />}>
        <Route index element={<Home />} />
        <Route path=":id" element={<Coin />} />
      </Route>
    </Routes>
  );
}

export default App;
