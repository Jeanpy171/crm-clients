import type { UserDTO } from "../../application/dtos/UserDTO";

export class UserResponseMapper {
  static fromApi(apiResponse: any): UserDTO {
    // Mapea la respuesta de la API al DTO de usuario
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
}
