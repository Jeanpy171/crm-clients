import type { IUserRepository } from "../../../domain/repositories/IUserRepository";

export class SignInUseCase {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
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
