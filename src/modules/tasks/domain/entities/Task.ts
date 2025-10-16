import type { TaskPriority, TaskStatus, TaskType } from "../valueObjects";

export class Task {
  constructor(
    public readonly id: string,
    public type: TaskType,
    public leadId: string,
    public status: TaskStatus,
    public dueDate: Date,
    public duration: number,
    public notes?: string,
    public completionNotes?: string,
    public priority: TaskPriority = "Media",
    public advisor?: string
  ) {}

  markCompleted(completionNotes: string) {
    if (this.status === "programada") throw new Error("Tarea ya completada");
    this.status = "completada";
    this.completionNotes = completionNotes;
  }
}
