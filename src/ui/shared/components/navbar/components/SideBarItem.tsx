import { useNavigate } from "react-router-dom";

export const SideBarItem = ({
  path,
  title,
}: {
  path: string;
  title: string;
}) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(path);
  };

  return (
    <li
      className="w-full h-full flex justify-center items-center border-b-2 border-transparent hover:border-b-blue-600 hover:scale-105 transition-all ease-in-out cursor-pointer hover:bg-blue-600/10"
      onClick={handleNavigate}
    >
      <h2 className="hover:text-blue-700 hover:font-semibold">{title}</h2>
    </li>
  );
};
