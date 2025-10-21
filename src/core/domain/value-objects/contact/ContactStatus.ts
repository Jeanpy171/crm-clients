export enum ContactStatus {
  LOST = "LOST",
  PROSPECT = "PROSPECT",
  LOYAL = "LOYAL",
}

export class ContactStatusVO {
  private constructor(private readonly _value: ContactStatus) {}

  static create(value: string): ContactStatusVO {
    const status = Object.values(ContactStatus).find(
      (status) => status === value
    );

    if (!status) throw new Error(`Invalid contact status: ${value}`);

    return new ContactStatusVO(status);
  }

  get value() {
    return this._value;
  }
}
