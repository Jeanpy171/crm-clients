import type { Contact } from "./Contact";

export class Lead {
  private constructor(public readonly id: string, public data: Contact) {}

  static create(data: Contact) {
    return new Lead(
      Date.now().toString() + Math.random().toString(36).substr(2, 9),
      data
    );
  }

  toJSON() {
    return {
      id: this.id,
      ...this.data,
    };
  }
}
