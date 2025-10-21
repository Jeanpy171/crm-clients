export enum InterestLevel {
  NOT_VERY_INTERESTED = "NOT VERY INTERESTED",
  INTEREST = "INTERESTED",
  VERY_INTERESTED = "VERY INTERESTED",
}

export class InterestLevelVO {
  private constructor(private readonly _value: InterestLevel) {}

  static create(value: string): InterestLevelVO {
    const interestedLevel = Object.values(InterestLevel).find(
      (status) => status === value
    );

    if (!interestedLevel) throw new Error(`Invalid interested level: ${value}`);

    return new InterestLevelVO(interestedLevel);
  }

  get value() {
    return this._value;
  }
}
