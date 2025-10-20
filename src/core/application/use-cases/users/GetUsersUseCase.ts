import type { IUserRepository } from "../../../domain/repositories/IUserRepository";
import type { UserDTO } from "../../dtos/users/UserDTO";

export class GetUserUseCase {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(): Promise<UserDTO[] | null> {
    return this.repository.getAll();
  }
}
