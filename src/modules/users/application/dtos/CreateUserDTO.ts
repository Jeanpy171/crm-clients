import type { UserRoles } from "../../domain/valueObjects/UserRoles";

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  phone: string;
  isActive: boolean;
}
