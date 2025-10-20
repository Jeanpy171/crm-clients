export enum LeadInterestLevel {
  NOT_VERY_INTERESTED = "NOT VERY INTERESTED",
  INTEREST = "INTERESTED",
  VERY_INTERESTED = "VERY INTERESTED",
}

export class LeadInterestLevelVO {
  private constructor(private readonly _value: LeadInterestLevel) {}

  static create(value: string): LeadInterestLevelVO {
    const interestedLevel = Object.values(LeadInterestLevel).find(
      (status) => status === value
    );

    if (!interestedLevel)
      throw new Error(`Invalid lead interested level: ${value}`);

    return new LeadInterestLevelVO(interestedLevel);
  }

  get value() {
    return this._value;
  }
}
