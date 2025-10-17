import { Task } from "../../domain/entities/Task";
import { TaskResponseMapper } from "../mappers/TaskResponseMapper";
import { TaskMapper } from "../../application/mappers/TaskMapper";
import type { TaskRepositoryPort } from "../../domain/ports/TaskRepositoryPort";
import { HttpClient } from "../../../../core/http/httpclient";
import { taskMocks } from "../../mocks/taskMock";
import type { TaskDTO } from "../../application/dtos/TaskDTO";

export class TaskMockAdapter implements TaskRepositoryPort {
  private http = HttpClient.getInstance();

  async getAll(): Promise<TaskDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = taskMocks as any[];
        resolve(data.map(TaskResponseMapper.fromApiResponse));
      }, 1500);
    });
  }

  async getById(id: string): Promise<TaskDTO | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = taskMocks.filter((task) => task.id === id);
        if (response.length === 0) throw new Error("Tarea no encontrada");

        const task = response[0];

        resolve(TaskResponseMapper.fromApiResponse(task));
      }, 1500);
    });
  }

  async save(task: Task): Promise<void> {
    const dto = TaskMapper.toDTO(task);
    await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<Task>): Promise<void> {
    await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
