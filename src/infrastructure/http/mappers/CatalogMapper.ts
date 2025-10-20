import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";

export class CatalogMapper {
  static fromApiToDto<T extends Record<string, any>>(
    apiData: T,
    mapping: { id: keyof T; name: keyof T; description: keyof T }
  ): CatalogDTO {
    return {
      id: apiData[mapping.id],
      name: apiData[mapping.name],
      description: apiData[mapping.description],
    };
  }
}
