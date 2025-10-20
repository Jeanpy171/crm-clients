export enum TaskPriority {
  HIGH = "HIGH",
  LOW = "LOW",
  AVARAGE = "AVARAGE",
}

export class TaskPriorityVO {
  private constructor(private readonly _value: TaskPriority) {}

  static create(value: string): TaskPriorityVO {
    const priority = Object.values(TaskPriority).find(
      (priority) => priority === value
    );

    if (!priority) throw new Error(`Invalid task priority status: ${value}`);
    return new TaskPriorityVO(priority);
  }

  get value(): TaskPriority {
    return this._value;
  }
}
