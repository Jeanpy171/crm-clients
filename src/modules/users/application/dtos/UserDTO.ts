import type { UserRoles } from "../../domain/valueObjects/UserRoles";

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  phone?: string;
  isActive: boolean;
}
