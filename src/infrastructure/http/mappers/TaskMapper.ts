import type { TaskDTO } from "../../../core/application/dtos/tasks/TaskDTO";
import { Task } from "../../../core/domain/entities/Task";

export class TaskMapper {
  static fromApiToDto(apiData: any): TaskDTO {
    return {
      id: apiData.task_id,
      type: apiData.task_type,
      leadId: apiData.lead_id,
      status: apiData.task_status,
      dueDate: apiData.due_date,
      duration: apiData.duration,
      notes: apiData.notes,
      completionNotes: apiData.completion_notes,
      priority: apiData.priority,
      advisor: apiData.advisor,
    };
  }

  static toDomain(dto: any): Task {
    return Task.create(dto);
  }

  static toDto(task: Task): TaskDTO {
    return task.toJSON();
  }
}
