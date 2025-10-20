import type { TaskDTO } from "../../application/dtos/tasks/TaskDTO";
import { TaskPriority, TaskStatus, type TaskType } from "../value-objects/task";
import { TaskPriorityVO } from "../value-objects/task/TaskPriority";
import { TaskStatusVO } from "../value-objects/task/TaskStatus";
import { TaskTypeVO } from "../value-objects/task/TaskType";

export class Task {
  private constructor(
    public readonly id: string,
    public type: TaskType,
    public leadId: string,
    public status: TaskStatus,
    public dueDate: Date,
    public duration: number,
    public notes?: string,
    public completionNotes?: string,
    public priority: TaskPriority = TaskPriority.AVARAGE,
    public advisor?: string
  ) {}

  static create(props: {
    id: string;
    type: TaskType;
    leadId: string;
    status: TaskStatus;
    dueDate: Date;
    duration: number;
    notes?: string;
    completionNotes?: string;
    priority: TaskPriority;
    advisor?: string;
  }): Task {
    const type = TaskTypeVO.create(props.type);
    const status = TaskStatusVO.create(props.status);
    const priority = TaskPriorityVO.create(props.priority);

    return new Task(
      props.id,
      type.value,
      props.leadId,
      status.value,
      props.dueDate,
      props.duration,
      props.notes,
      props.completionNotes,
      priority.value,
      props.advisor!
    );
  }

  markCompleted(completionNotes: string) {
    if (this.status === TaskStatus.COMPLETED)
      throw new Error("Tarea ya completada");
    this.status = TaskStatus.COMPLETED;
    this.completionNotes = completionNotes;
  }

  toJSON(): TaskDTO {
    return {
      id: this.id,
      type: this.type,
      leadId: this.leadId,
      status: this.status,
      dueDate: this.dueDate.toISOString(),
      duration: this.duration,
      notes: this.notes,
      completionNotes: this.completionNotes,
      priority: this.priority,
      advisor: this.advisor!,
    };
  }
}
