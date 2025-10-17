import { useAuth } from "../../hooks/useAuth";
import type { UserRoles } from "../../../../modules/users/domain/valueObjects/UserRoles";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Routes } from "../../../../app/router/routes";

export const NavBar = () => {
  //   const { user, handleLogout } = useAuth();
  //   const { role, firstName } = user || {};
  const { user, handleLogOut } = useAuth();

  const getRoutesByRole = (role?: UserRoles) => {
    console.warn("role", role);
    if (!role) return [];

    const routesByRole = Routes[role]?.routes;

    console.warn("routesByRole", routesByRole);

    const routes = Object.values(routesByRole || {}).map((route) => ({
      title: route.title.toUpperCase(),
      path: `/${role}/${route.path}`,
    }));

    return routes;
  };

  return (
    <div>
      <Header user={user} handleLogOut={handleLogOut} />
      <SideBar routes={getRoutesByRole(user?.role)} />
    </div>
  );
};
