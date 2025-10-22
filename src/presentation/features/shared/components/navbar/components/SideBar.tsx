import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ routes }: { routes: any[] }) => {
  return (
    <nav className="h-16 border-b-2 border-b-zinc-400 border-transparent shadow-lg flex items-center justify-center">
      <ul className="flex w-full h-full justify-around">
        {routes.map((route: any) => (
          <SideBarItem key={route.path} path={route.path} title={route.title} />
        ))}
      </ul>
    </nav>
  );
};
