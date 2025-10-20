import type { UserDTO } from "../../../core/application/dtos/users/UserDTO";

import { User } from "../../../core/domain/entities/User";

export class UserMapper {
  static fromApiToDto(apiResponse: any): UserDTO {
    return {
      id: apiResponse.id,
      username: apiResponse.username,
      email: apiResponse.email,
      firstName: apiResponse.first_name,
      lastName: apiResponse.last_name,
      role: apiResponse.role,
      phone: apiResponse.phone,
      isActive: apiResponse.is_active,
    };
  }

  static toDomain(dto: any): User {
    return User.create(dto);
  }

  static toDto(user: User): UserDTO {
    return user.toJSON();
  }
}
