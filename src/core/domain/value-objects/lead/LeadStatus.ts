export enum LeadStatus {
  GRADE = "GRADE",
  DEVELOP = "DEVELOP",
  PROPOSE = "PROPOSE",
  CLOSING = "CLOSING",
}

export class LeadStatusVO {
  private constructor(private readonly _value: LeadStatus) {}

  static create(value: string): LeadStatusVO {
    const status = Object.values(LeadStatus).find((status) => status === value);

    if (!status) throw new Error(`Invalid lead status: ${value}`);

    return new LeadStatusVO(status);
  }

  get value() {
    return this._value;
  }
}
