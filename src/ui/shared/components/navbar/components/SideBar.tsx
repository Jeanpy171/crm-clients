import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ routes }: { routes: any[] }) => {
  return (
    <nav className="h-24 border-b-2 border-b-blue-950 border-transparent shadow-lg flex items-center justify-center">
      <ul className="flex w-full h-full justify-around">
        {routes.map((route: any) => (
          <SideBarItem key={route.path} path={route.path} title={route.title} />
        ))}
      </ul>
    </nav>
  );
};
