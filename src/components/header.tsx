import { Link } from "react-router-dom";
import { Dropdown } from "./dropdown";

export const Header = () => {
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl whitespace-nowrap dark:text-white">
              Cryplet
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Dropdown />
          </div>
        </div>
      </nav>
    </header>
  );
};
