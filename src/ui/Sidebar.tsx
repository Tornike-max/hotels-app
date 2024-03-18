import { Link, useLocation } from "react-router-dom";

export default function Sidebar({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  const { pathname } = useLocation();
  return (
    <Link
      to={`/${path}`}
      className={`w-full rounded-md text-white hover:bg-primary-600 hover:font-semibold py-2 px-3 ${
        pathname === `/${path}`
          ? "bg-primary-600 font-semibold"
          : "bg-none text-white"
      } duration-100 transition-all cursor-pointer `}
    >
      <li>{label}</li>
    </Link>
  );
}
