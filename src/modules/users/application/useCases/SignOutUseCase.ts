import type { UserRepositoryPort } from "../../domain/ports/UserRepositoryPort";

export class SignOutUseCase {
  private repository: UserRepositoryPort;

  constructor(repository: UserRepositoryPort) {
    this.repository = repository;
  }

  async execute(): Promise<void> {
    return this.repository.signOut();
  }
}
