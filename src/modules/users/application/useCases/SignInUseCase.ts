import type { UserRepositoryPort } from "../../domain/ports/UserRepositoryPort";

export class SignInUseCase {
  private repository: UserRepositoryPort;

  constructor(repository: UserRepositoryPort) {
    this.repository = repository;
  }

  async execute(
    username: string,
    password: string,
    role: string
  ): Promise<any | null> {
    return this.repository.signIn(username, password, role);
  }
}
