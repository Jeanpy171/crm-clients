import { useAuth } from "../../hooks/useAuth";
import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Routes } from "../../../../routing/routes";
import type { UserRoles } from "../../../../../core/domain/value-objects/user";

export const NavBar = () => {
  const { user, handleLogOut } = useAuth();

  const getRoutesByRole = (role?: UserRoles) => {
    console.warn("Role in Navbar", role);
    if (!role) return [];

    const routesByRole = Routes[role]?.routes;

    console.warn("routesByRole", routesByRole);

    const routes = Object.values(routesByRole || {}).map((route) => ({
      title: route.title.toUpperCase(),
      path: `/${role.toLowerCase()}/${route.path}`,
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
