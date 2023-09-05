import { Dropdown } from "./dropdown";
import { TrandingCoins } from "./trandingCoins";

export const Home = () => {
  return (
    <div className="home">
      <div className="flex items-center justify-center flex-col gap-y-8">
        <TrandingCoins />
      </div>
    </div>
  );
};
