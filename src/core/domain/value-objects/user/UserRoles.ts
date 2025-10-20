export enum UserRoles {
  ADMIN = "ADMIN",
  SALES_MANAGER = "SALES_MANAGER",
  ADVISOR = "ADVISOR",
}

export class UserRolesVO {
  private constructor(private readonly _value: UserRoles) {}

  static create(value: string): UserRolesVO {
    const role = Object.values(UserRoles).find((role) => role === value);

    if (!role) throw new Error(`Invalid user role: ${value}`);
    return new UserRolesVO(role);
  }

  get value(): UserRoles {
    return this._value;
  }
}
