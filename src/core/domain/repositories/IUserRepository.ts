import type { CreateUserDTO } from "../../application/dtos/users/CreateUserDTO";
import type { UserDTO } from "../../application/dtos/users/UserDTO";

export interface IUserRepository {
  signIn(username: string, password: string, role: string): Promise<any | null>;
  signOut(): Promise<void>;
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  save(user: CreateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<UserDTO>): Promise<void>;
}
