import { HttpClient } from "../../../../core/http/httpclient";
import { SessionLocalStorageAdapter } from "../../../../core/storage/adapters/SessionLocalStorageAdapter";
import type { CreateUserDTO } from "../../application/dtos/CreateUserDTO";
import type { UserDTO } from "../../application/dtos/UserDTO";
import { UserMapper } from "../../application/mapper/UserMapper";
import type { UserRepositoryPort } from "../../domain/ports/UserRepositoryPort";
import { UserResponseMapper } from "../mappers/UserResponseMapper";

export class UserApiAdapter implements UserRepositoryPort {
  private http = HttpClient.getInstance();
  public sessionStorage = new SessionLocalStorageAdapter();

  async signIn(email: string, password: string): Promise<any | null> {
    const response = await this.http.post<Response>(
      "/api/auth/signin",
      JSON.stringify({ email, password })
    );
    const data = response as any;
    this.sessionStorage.saveSession(data.token, data.user);
    const dto = UserResponseMapper.fromApi(data.user);
    return dto;
  }

  async signOut(): Promise<void> {
    await this.http.post("/api/auth/signout", null);
    this.sessionStorage.clearSession();
  }

  async getAll(): Promise<any[]> {
    const response = await this.http.get<any[]>("/api/users");
    const data = response as any[];
    const dtos = data.map(UserResponseMapper.fromApi);
    return dtos.map(UserMapper.fromDTO);
  }

  async getById(id: string): Promise<any> {
    const response = await this.http.get<Response>(`/api/users/${id}`);
    const dto = UserResponseMapper.fromApi(response);
    return UserMapper.fromDTO(dto);
  }

  async save(user: CreateUserDTO): Promise<void> {
    await this.http.post(`/api/users/`, JSON.stringify(user));
  }
  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/users/${id}`);
  }

  async patch(id: string, updates: Partial<UserDTO>): Promise<void> {
    await this.http.patch(`/api/users/${id}`, JSON.stringify(updates));
  }
}
