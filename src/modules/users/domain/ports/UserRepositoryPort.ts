import type { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import type { UserDTO } from "../../application/dtos/UserDTO";

export interface UserRepositoryPort {
  // Define methods for user repository operations
  signIn(username: string, password: string, role: string): Promise<any | null>;
  signOut(): Promise<void>;
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  save(user: CreateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<UserDTO>): Promise<void>;
}
