import { useLocation, useNavigate } from "react-router-dom";

export const SideBarItem = ({
  path,
  title,
}: {
  path: string;
  title: string;
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSamePath = pathname.endsWith(path);
  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <li
      className={`w-full h-full flex justify-center items-center border-b-2 border-transparent hover:border-b-blue-600 hover:scale-105 transition-all transform ease-in-out cursor-pointer hover:bg-blue-600/10 ${
        isSamePath ? "border-b-blue-600 bg-blue-600/10" : ""
      }`}
      onClick={handleNavigate}
    >
      <h2
        className={`hover:text-zinc-800 hover:font-semibold ${
          isSamePath
            ? "text-blue-700 font-bold"
            : "text-gray-500 font-normal"
        }`}
      >
        {title}
      </h2>
    </li>
  );
};
