import { User } from "../../domain/entities/User";
import type { UserDTO } from "../dtos/UserDTO";

export class UserMapper {
  static fromDTO(dto: UserDTO): User {
    return new User(
      dto.id,
      dto.username,
      dto.email,
      dto.firstName,
      dto.lastName,
      dto.role,
      dto.phone,
      dto.isActive
    );
  }

  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      phone: user.phone,
      isActive: user.isActive,
    };
  }
}
