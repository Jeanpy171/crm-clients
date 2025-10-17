import { SessionLocalStorageAdapter } from "../../../../core/storage/adapters/SessionLocalStorageAdapter";
import type { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import type { UserDTO } from "../../application/dtos/UserDTO";
import { UserMapper } from "../../application/mapper/UserMapper";
import type { UserRepositoryPort } from "../../domain/ports/UserRepositoryPort";
import { usersMock } from "../../mocks/userMock";
import { UserResponseMapper } from "../mappers/UserResponseMapper";

export class UserMockAdapter implements UserRepositoryPort {
  public sessionStorage = new SessionLocalStorageAdapter();

  async signIn(
    username: string,
    password: string,
    role: string
  ): Promise<any | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const response = usersMock.filter(
            (user) => user.username === username && user.role === role
          );

          if (response.length === 0) {
            throw new Error("Usuario no encontrado");
          }

          const user = response[0];

          if (user.password !== password) {
            throw new Error("Credenciales invalidas");
          }

          this.sessionStorage.saveSession(
            "JNNDJVNDLVKNDLKVNSLDS",
            UserResponseMapper.fromApi(user)
          );
          const dto = UserResponseMapper.fromApi(user);
          resolve(dto);
        } catch (error) {
          reject(error);
        }
      }, 1500);
    });
  }

  async signOut(): Promise<void> {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.sessionStorage.clearSession());
      }, 1500);
    });
  }

  async getAll(): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = usersMock as any[];
        const dtos = data.map(UserResponseMapper.fromApi);
        resolve(dtos.map(UserMapper.fromDTO));
      }, 1500);
    });
  }

  async getById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const response = usersMock.filter((user) => user.id === id);

        if (response.length === 0) {
          throw new Error("Usuario no encontrado");
        }
        const user = response[0];

        const dto = UserResponseMapper.fromApi(user);
        resolve(UserMapper.fromDTO(dto));
      }, 1500);
    });
  }

  async save(user: CreateUserDTO): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...user, id: (usersMock.length + 1).toString() };
        usersMock.push(newUser);
        resolve();
      }, 1500);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = usersMock.findIndex((user) => user.id === id);
        if (index === -1) {
          reject(new Error("Usuario no encontrado"));
          return;
        }
        usersMock.splice(index, 1);
        resolve();
      }, 1500);
    });
  }

  async patch(id: string, updates: Partial<UserDTO>): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = usersMock.findIndex((user) => user.id === id);
        if (index === -1) {
          reject(new Error("Usuario no encontrado"));
          return;
        }
        usersMock[index] = { ...usersMock[index], ...updates };
        resolve();
      }, 1500);
    });
  }
}
