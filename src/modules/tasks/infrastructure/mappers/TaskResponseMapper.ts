import type { TaskDTO } from "../../application/dtos/TaskDTO";
import type {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../domain/valueObjects";

export class TaskResponseMapper {
  static fromApiResponse(apiData: any): TaskDTO {
    return {
      id: apiData.task_id,
      type: apiData.task_type as TaskType,
      leadId: apiData.lead_id,
      status: apiData.task_status as TaskStatus,
      dueDate: apiData.due_date,
      duration: apiData.duration,
      notes: apiData.notes,
      completionNotes: apiData.completion_notes,
      priority: apiData.priority as TaskPriority,
      advisor: apiData.advisor,
    };
  }
}
