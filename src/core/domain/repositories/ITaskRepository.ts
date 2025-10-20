import type { TaskDTO } from "../../application/dtos/tasks/TaskDTO";
import type { Task } from "../entities/Task";

export interface ITaskRepository {
  // Define los métodos que el repositorio debe implementar
  getAll(): Promise<TaskDTO[]>;
  getById(id: string): Promise<TaskDTO | null>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<Task>): Promise<void>;
}
