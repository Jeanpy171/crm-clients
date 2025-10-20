import type { ITaskRepository } from "../../../domain/repositories/ITaskRepository";
import type { TaskDTO } from "../../dtos/tasks/TaskDTO";

export class GetTasksUseCase {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(): Promise<TaskDTO[]> {
    return await this.taskRepository.getAll();
  }
}
