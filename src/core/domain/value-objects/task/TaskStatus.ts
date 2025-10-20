export enum TaskStatus {
  OPENED = "OPENED",
  PROGRAMED = "PROGRAMED",
  COMPLETED = "COMPLETED",
  CLOSED = "CLOSED",
}

export class TaskStatusVO {
  private constructor(private readonly _value: TaskStatus) {}

  static create(value: string): TaskStatusVO {
    const priority = Object.values(TaskStatus).find(
      (priority) => priority === value
    );

    if (!priority) throw new Error(`Invalid task status: ${value}`);
    return new TaskStatusVO(priority);
  }

  get value(): TaskStatus {
    return this._value;
  }
}
