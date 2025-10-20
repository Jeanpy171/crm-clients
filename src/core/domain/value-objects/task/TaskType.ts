export enum TaskType {
  CALL = "OPENED",
  MESSAGE = "PROGRAMED",
  EMAIL = "COMPLETED",
  IN_PERSON_MEETING = "IN_PERSON_MEETING",
}

export class TaskTypeVO {
  private constructor(private readonly _value: TaskType) {}

  static create(value: string): TaskTypeVO {
    const priority = Object.values(TaskType).find(
      (priority) => priority === value
    );

    if (!priority) throw new Error(`Invalid task type: ${value}`);
    return new TaskTypeVO(priority);
  }

  get value(): TaskType {
    return this._value;
  }
}
