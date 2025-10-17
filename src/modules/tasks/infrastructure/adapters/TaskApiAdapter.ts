import { Task } from "../../domain/entities/Task";
import { TaskResponseMapper } from "../mappers/TaskResponseMapper";
import { TaskMapper } from "../../application/mappers/TaskMapper";
import type { TaskRepositoryPort } from "../../domain/ports/TaskRepositoryPort";
import { HttpClient } from "../../../../core/http/httpclient";

export class TaskApiAdapter implements TaskRepositoryPort {
  private http = HttpClient.getInstance();

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/tasks/${id}`);
  }

  async getAll(): Promise<Task[]> {
    const response = await this.http.get<Task[]>("/api/tasks");
    const data = response as any[];
    const dtos = data.map((item: any) =>
      TaskResponseMapper.fromApiResponse(item)
    );
    return dtos.map(TaskMapper.fromDTO);
  }

  async getById(id: string): Promise<Task | null> {
    const response = await fetch(`/api/tasks/${id}`);
    if (!response.ok) return null;
    const dto = TaskResponseMapper.fromApiResponse(await response.json());
    return TaskMapper.fromDTO(dto);
  }

  async save(task: Task): Promise<void> {
    const dto = TaskMapper.toDTO(task);
    await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }
}
