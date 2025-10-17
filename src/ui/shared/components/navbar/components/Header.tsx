import { Button } from "@heroui/react";
import type { UserRoles } from "../../../../../modules/users/domain/valueObjects/UserRoles";
import type { User } from "../../../../../modules/users/domain/entities/User";

const getThemeColor = (role?: UserRoles) => {
  if (!role) return "bg-gray-700";

  switch (role) {
    case "manager":
      return "bg-blue-600";
    case "advisor":
      return "bg-emerald-600";
    case "admin":
      return "bg-purple-600";
    default:
      return "bg-gray-700";
  }
};

export const Header = ({
  user,
  handleLogOut,
}: {
  user: User | null;
  handleLogOut: () => void;
}) => {
  const { role, firstName } = user || {};

  return (
    <header
      className={`${getThemeColor(user?.role)} text-white shadow-md h-28`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">{`CRM ${role}`}</h1>
          <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
            {role}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">{firstName}</span>
          <Button
            size="sm"
            variant="flat"
            color="default"
            onPress={handleLogOut}
            className="text-white"
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
};
