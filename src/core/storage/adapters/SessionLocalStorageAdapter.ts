import type { UserDTO } from "../../../modules/users/application/dtos/UserDTO";
import type { SessionRepositoryPort } from "../ports/SessionRepositoryPort";

export class SessionLocalStorageAdapter implements SessionRepositoryPort {
  private static ACCESS_TOKEN_KEY = "access_token";
  private static USER_KEY = "user_data";

  saveToken(token: string): Promise<void> {
    return Promise.resolve(
      localStorage.setItem(SessionLocalStorageAdapter.ACCESS_TOKEN_KEY, token)
    );
  }
  getToken(): Promise<string | null> {
    return Promise.resolve(
      localStorage.getItem(SessionLocalStorageAdapter.ACCESS_TOKEN_KEY)
    );
  }
  deleteToken(): Promise<void> {
    return Promise.resolve(
      localStorage.removeItem(SessionLocalStorageAdapter.ACCESS_TOKEN_KEY)
    );
  }

  saveUser(user: UserDTO): Promise<void> {
    return Promise.resolve(
      localStorage.setItem(
        SessionLocalStorageAdapter.USER_KEY,
        JSON.stringify(user)
      )
    );
  }

  getUser(): Promise<string | null> {
    return Promise.resolve(
      localStorage.getItem(SessionLocalStorageAdapter.USER_KEY)
    );
  }

  deleteUser(): Promise<void> {
    return Promise.resolve(
      localStorage.removeItem(SessionLocalStorageAdapter.USER_KEY)
    );
  }

  saveSession(token: string, user: UserDTO): Promise<void> {
    this.saveToken(token);
    this.saveUser(user);
    return Promise.resolve();
  }

  clearSession(): Promise<void> {
    this.deleteToken();
    this.deleteUser();
    return Promise.resolve();
  }
}
