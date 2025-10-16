// modules/tasks/application/mappers/TaskMapper.ts
import { Task } from "../../domain/entities/Task";
import type { TaskDTO } from "../dtos/TaskDTO";

export class TaskMapper {
  static fromDTO(dto: TaskDTO): Task {
    return new Task(
      dto.id,
      dto.type,
      dto.leadId,
      dto.status,
      new Date(dto.dueDate),
      dto.duration,
      dto.notes,
      dto.completionNotes,
      dto.priority,
      dto.advisor
    );
  }

  static toDTO(task: Task): TaskDTO {
    return {
      id: task.id,
      type: task.type,
      leadId: task.leadId,
      status: task.status,
      dueDate: task.dueDate.toISOString(),
      duration: task.duration,
      notes: task.notes,
      completionNotes: task.completionNotes,
      priority: task.priority,
      advisor: task.advisor!,
    };
  }
}
