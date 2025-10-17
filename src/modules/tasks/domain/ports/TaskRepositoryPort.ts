import type { Task } from "../entities/Task";

export interface TaskRepositoryPort {
  // Define los métodos que el repositorio debe implementar
  getById(id: string): Promise<Task | null>;
  save(task: Task): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Task[]>;
}
