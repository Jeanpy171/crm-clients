import type { TaskRepositoryPort } from "../../domain/ports/TaskRepositoryPort";
import type { TaskDTO } from "../dtos/TaskDTO";

export class GetTasksUseCase {
  private taskRepository: TaskRepositoryPort;

  constructor(taskRepository: TaskRepositoryPort) {
    this.taskRepository = taskRepository;
  }

  async execute(): Promise<TaskDTO[]> {
    return await this.taskRepository.getAll();
  }
}
