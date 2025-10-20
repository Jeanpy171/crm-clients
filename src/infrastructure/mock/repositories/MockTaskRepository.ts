import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";
import type { TaskDTO } from "../../../core/application/dtos/tasks/TaskDTO";
import type { Task } from "../../../core/domain/entities/Task";
import type { ITaskRepository } from "../../../core/domain/repositories/ITaskRepository";
import { CatalogMapper } from "../../http/mappers/CatalogMapper";

import { TaskMapper } from "../../http/mappers/TaskMapper";
import {
  taskMocks,
  taskPrioritiesMock,
  taskStatusMock,
  taskTypesMock,
} from "../data/taskMock";

export class MockTaskRepository implements ITaskRepository {
  async getAll(): Promise<TaskDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = taskMocks as any[];
        console.warn("TASK EN MOCK: ", data);
        resolve(data.map(TaskMapper.fromApiToDto));
      }, 1500);
    });
  }

  async getStatusCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = taskStatusMock as any[];
        console.warn("TASK EN MOCK: ", data);
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "task_status_id",
              name: "task_status_name",
              description: "task_status_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getTypeCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = taskTypesMock as any[];
        console.warn("TASK EN MOCK: ", data);
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "task_type_id",
              name: "task_type_name",
              description: "task_type_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getPriorityCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = taskPrioritiesMock as any[];
        console.warn("TASK EN MOCK: ", data);
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "task_priority_id",
              name: "task_priority_name",
              description: "task_priority_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getById(id: string): Promise<TaskDTO | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = taskMocks.filter((task) => task.task_id === id);
        if (response.length === 0) throw new Error("Tarea no encontrada");

        const task = response[0];

        resolve(TaskMapper.fromApiToDto(task));
      }, 1500);
    });
  }

  async save(task: TaskDTO): Promise<TaskDTO> {
    // const dto = TaskMapper.toDomain(task);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(task);
      }, 1500);
    });
    // await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }

  async delete(id: string): Promise<void> {
    // await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<Task>): Promise<void> {
    // await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
