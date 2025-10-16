import type { Task } from "../entities/Task";

export interface TaskRepositoryPort {
  // Define los métodos que el repositorio debe implementar
  findById(id: string): Promise<Task>;
  save(task: any): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Task[]>;
}
