import { Link, useLocation } from "react-router-dom";
import { paths } from "../constants/constant";

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex w-full justify-center items-center py-4 px-10">
      <ul className="w-full flex justify-between items-center">
        {paths.slice(2).map((path) => (
          <Link
            className={`text-white py-1 px-2 hover:bg-primary-500  ${
              pathname === `/${path.path}` ? "bg-primary-500" : "bg-none"
            } rounded-md duration-150 transition-all`}
            to={`/${path.path}`}
            key={path.label}
          >
            {path.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
