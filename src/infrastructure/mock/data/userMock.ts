import { UserRoles } from "../../../core/domain/value-objects/user";

export const usersMock = [
  {
    id: "1a2b3c4d",
    username: "admin",
    email: "admin.prueba@example.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "Prueba",
    role: UserRoles.ADMIN,
    phone: "+593987654321",
    isActive: true,
  },
  {
    id: "929kjfbskjfbskd",
    username: "manager",
    email: "manager.prueba@example.com",
    password: "manager123",
    firstName: "Manager",
    lastName: "Prueba",
    role: UserRoles.SALES_MANAGER,
    phone: "+593987654321",
    isActive: true,
  },
  {
    id: "9i09njksabckjasbka",
    username: "advisor",
    email: "advisor.prueba@example.com",
    password: "advisor123",
    firstName: "Advisor",
    lastName: "Prueba",
    role: UserRoles.ADVISOR,
    phone: "+593987654321",
    isActive: true,
  },
];
