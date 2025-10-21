import type { CatalogDTO } from "../../application/dtos/catalogs/CatalogDTO";

export interface IContactRepository {
  getInteractionPhaseCatalog(): Promise<CatalogDTO[]>;
  getInterestLevelCatalog(): Promise<CatalogDTO[]>;
  getContactStatusCatalog(): Promise<CatalogDTO[]>;
}
