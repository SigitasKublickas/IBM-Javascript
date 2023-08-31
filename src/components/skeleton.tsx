import { Outlet } from "react-router-dom";

export const Skeleton = () => {
  return (
    <div className="skeleton">
      <header className="nav-bar">header</header>
      <section className="body">
        <Outlet />
      </section>
    </div>
  );
};
