import type { Task } from "../../domain/entities/Task";
import type { TaskRepositoryPort } from "../../domain/ports/TaskRepositoryPort";

export class GetTasksUseCase {
  private taskRepository: TaskRepositoryPort;

  constructor(taskRepository: TaskRepositoryPort) {
    this.taskRepository = taskRepository;
  }

  async execute(): Promise<Task[]> {
    return this.taskRepository.findAll();
  }
}
