import type { CatalogDTO } from "../../application/dtos/catalogs/CatalogDTO";
import type { TaskDTO } from "../../application/dtos/tasks/TaskDTO";

export interface ITaskRepository {
  // Define los métodos que el repositorio debe implementar
  getAll(): Promise<TaskDTO[]>;
  getStatusCatalog(): Promise<CatalogDTO[]>;
  getTypeCatalog(): Promise<CatalogDTO[]>;
  getPriorityCatalog(): Promise<CatalogDTO[]>;
  getById(id: string): Promise<TaskDTO | null>;
  save(task: TaskDTO): Promise<TaskDTO>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<TaskDTO>): Promise<void>;
}
