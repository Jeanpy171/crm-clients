import type { TaskDTO } from "../../../core/application/dtos/tasks/TaskDTO";
import type { Task } from "../../../core/domain/entities/Task";
import type { ITaskRepository } from "../../../core/domain/repositories/ITaskRepository";
import { HttpClient } from "../../http/http-client";
import { TaskMapper } from "../../http/mappers/TaskMapper";
import { taskMocks } from "../data/taskMock";

export class MockTaskRepository implements ITaskRepository {
  private http = HttpClient.getInstance();

  async getAll(): Promise<TaskDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = taskMocks as any[];
        resolve(data.map(TaskMapper.fromApiToDto));
      }, 1500);
    });
  }

  async getById(id: string): Promise<TaskDTO | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = taskMocks.filter((task) => task.id === id);
        if (response.length === 0) throw new Error("Tarea no encontrada");

        const task = response[0];

        resolve(TaskMapper.fromApiToDto(task));
      }, 1500);
    });
  }

  async save(task: Task): Promise<void> {
    const dto = TaskMapper.toDomain(task);
    await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<Task>): Promise<void> {
    await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
