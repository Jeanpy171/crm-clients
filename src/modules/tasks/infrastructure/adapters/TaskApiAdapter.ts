import { Task } from "../../domain/entities/Task";
import { TaskResponseMapper } from "../mappers/TaskResponseMapper";
import { TaskMapper } from "../../application/mappers/TaskMapper";
import type { TaskRepositoryPort } from "../../domain/ports/TaskRepositoryPort";
import type { HttpClient } from "../../../../core/http/httpclient";

export class TaskApiAdapter implements TaskRepositoryPort {
  constructor(private http: HttpClient) {}

  findById(id: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Task[]> {
    const response = await this.http.get<Task[]>("/api/tasks");
    const data = response as any[];
    const dtos = data.map((item: any) =>
      TaskResponseMapper.fromApiResponse(item)
    );
    return dtos.map(TaskMapper.fromDTO);
  }

  async getTaskById(id: string): Promise<Task | null> {
    const response = await fetch(`/api/tasks/${id}`);
    if (!response.ok) return null;
    const dto = TaskResponseMapper.fromApiResponse(await response.json());
    return TaskMapper.fromDTO(dto);
  }

  async save(task: Task): Promise<void> {
    const dto = TaskMapper.toDTO(task);
    await fetch(`/api/tasks/${dto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  }
}
