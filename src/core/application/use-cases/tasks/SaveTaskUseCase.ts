import type { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import type { TaskDTO } from "../../dtos/tasks/TaskDTO";

export class SaveTaskUseCase {
  private repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }
  async execute(task: TaskDTO) {
    return this.repository.save(task);
  }
}
