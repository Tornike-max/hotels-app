import { Link } from "react-router-dom";

export default function Sidebar({
  path,
  label,
}: {
  path: string;
  label: string;
}) {
  return (
    <Link
      to={`/${path}`}
      className="w-full text-white rounded-md bg-none py-2 px-3 hover:bg-white hover:text-black duration-100 transition-all cursor-pointer hover:font-semibold"
    >
      <li>{label}</li>
    </Link>
  );
}
