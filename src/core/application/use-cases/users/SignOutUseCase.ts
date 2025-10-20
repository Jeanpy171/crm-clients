import type { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class SignOutUseCase {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(): Promise<void> {
    return this.repository.signOut();
  }
}
