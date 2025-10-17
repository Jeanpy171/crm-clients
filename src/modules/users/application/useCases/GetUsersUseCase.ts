import type { TaskDTO } from "../../../tasks/application/dtos/TaskDTO";
import type { TaskRepositoryPort } from "../../../tasks/domain/ports/TaskRepositoryPort";

export class GetUserUseCase {
  private repository: TaskRepositoryPort;

  constructor(repository: TaskRepositoryPort) {
    this.repository = repository;
  }

  async execute(): Promise<TaskDTO[] | null> {
    return this.repository.getAll();
  }
}
