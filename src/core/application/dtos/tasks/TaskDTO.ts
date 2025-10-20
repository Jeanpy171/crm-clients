import type {
  TaskPriority,
  TaskStatus,
  TaskType,
} from "../../../domain/value-objects/task";

export interface TaskDTO {
  id: string;
  type: TaskType;
  leadId: string;
  status: TaskStatus;
  dueDate: string;
  duration: number;
  notes?: string;
  completionNotes?: string;
  priority: TaskPriority;
  advisor: string;
}
