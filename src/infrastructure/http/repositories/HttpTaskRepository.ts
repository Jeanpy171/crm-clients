import type { ITaskRepository } from "../../../core/domain/repositories/ITaskRepository";
import { HttpClient } from "../http-client";
import type { TaskDTO } from "../../../core/application/dtos/tasks/TaskDTO";
import type { Task } from "../../../core/domain/entities/Task";
import { TaskMapper } from "../mappers/TaskMapper";

export class HttpTaskRepository implements ITaskRepository {
  private http = HttpClient.getInstance();

  async getAll(): Promise<TaskDTO[]> {
    const response = await this.http.get<Task[]>("/api/tasks");
    const data = response as any[];
    return data.map(TaskMapper.fromApiToDto);
  }

  async getById(id: string): Promise<TaskDTO | null> {
    const response = await this.http.get<Response>(`/api/tasks/${id}`);
    return TaskMapper.fromApiToDto(response);
  }

  async save(task: Task): Promise<void> {
    const dto = TaskMapper.toDto(task);
    await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<Task>): Promise<void> {
    await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
