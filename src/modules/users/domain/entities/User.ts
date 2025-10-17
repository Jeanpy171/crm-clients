import type { UserRoles } from "../valueObjects/UserRoles";

export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: UserRoles,
    public phone?: string,
    public isActive: boolean = true
  ) {}
}
