import { Button } from "@heroui/react";
import { UserRoles } from "../../../../../../core/domain/value-objects/user";
import type { User } from "../../../../../../core/domain/entities/User";

const getThemeColor = (role?: UserRoles) => {
  if (!role) return "bg-gray-700";

  switch (role) {
    case UserRoles.SALES_MANAGER:
      return "bg-blue-600";
    case UserRoles.ADVISOR:
      return "bg-emerald-600";
    case UserRoles.ADMIN:
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
      className={`${getThemeColor(user?.role)} text-white shadow-md h-20`}
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
