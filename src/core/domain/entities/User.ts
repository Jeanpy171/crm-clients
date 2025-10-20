import type { UserDTO } from "../../application/dtos/users/UserDTO";
import { UserRoles } from "../value-objects/user";
import { UserRolesVO } from "../value-objects/user/UserRoles";

export class User {
  private constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: UserRoles,
    public phone?: string,
    public isActive: boolean = true
  ) {}

  static create(props: {
    readonly id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    phone?: string;
    isActive: boolean;
  }): User {
    const role = UserRolesVO.create(props.role);
    return new User(
      props.id,
      props.username,
      props.email,
      props.firstName,
      props.lastName,
      role.value,
      props.phone,
      props.isActive
    );
  }

  toJSON(): UserDTO {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      phone: this.phone,
      isActive: this.isActive,
    };
  }
}
