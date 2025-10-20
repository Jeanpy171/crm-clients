import type { CreateUserDTO } from "../../../core/application/dtos/users/CreateUserDTO";
import type { UserDTO } from "../../../core/application/dtos/users/UserDTO";
import type { IUserRepository } from "../../../core/domain/repositories/IUserRepository";
import { LocalSessionStorage } from "../../storage/LocalSessionStorage";
import { HttpClient } from "../http-client";
import { UserMapper } from "../mappers/UserMapper";

export class HttpUserRepository implements IUserRepository {
  private http = HttpClient.getInstance();
  public sessionStorage = new LocalSessionStorage();

  async signIn(email: string, password: string): Promise<any | null> {
    const response = await this.http.post<Response>(
      "/api/auth/signin",
      JSON.stringify({ email, password })
    );
    const data = response as any;
    this.sessionStorage.saveSession(data.token, data.user);
    const dto = UserMapper.fromApiToDto(data.user);
    return dto;
  }

  async signOut(): Promise<void> {
    await this.http.post("/api/auth/signout", null);
    this.sessionStorage.clearSession();
  }

  async getAll(): Promise<any[]> {
    const response = await this.http.get<any[]>("/api/users");
    const data = response as any[];
    const dtos = data.map(UserMapper.fromApiToDto);
    return dtos.map(UserMapper.toDomain);
  }

  async getById(id: string): Promise<any> {
    const response = await this.http.get<Response>(`/api/users/${id}`);
    const dto = UserMapper.fromApiToDto(response);
    return UserMapper.toDomain(dto);
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
