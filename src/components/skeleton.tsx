import { Outlet } from "react-router-dom";
import { Header } from "./header";

export const Skeleton = () => {
  return (
    <div className="px-4 lg:px-6 py-2.5">
      <Header />
      <section className="body px-4 lg:px-6 py-2.5">
        <Outlet />
      </section>
    </div>
  );
};
