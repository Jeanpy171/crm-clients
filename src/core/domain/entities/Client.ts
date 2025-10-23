import type { Contact } from "./Contact";

export class Client {
  private constructor(public readonly id: string, public data: Contact) {}

  static create(data: Contact) {
    return new Client(
      Date.now().toString() + Math.random().toString(36).substr(2, 9),
      data
    );
  }

  toJSON() {
    return {
      ...this.data.toJSON(),
    };
  }
}
