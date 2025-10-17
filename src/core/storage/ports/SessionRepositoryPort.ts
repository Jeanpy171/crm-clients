import type { UserDTO } from "../../../modules/users/application/dtos/UserDTO";

export interface SessionRepositoryPort {
  // Define methods for token repository operations
  saveToken(token: string): Promise<void>;
  getToken(): Promise<string | null>;
  deleteToken(): Promise<void>;
  saveUser(user: UserDTO): Promise<void>;
  getUser(): Promise<string | null>;
  deleteUser(): Promise<void>;
}
