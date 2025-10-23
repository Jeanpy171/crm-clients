import type { CatalogDTO } from "../../application/dtos/catalogs/CatalogDTO";

export interface ICatalogRepository {
  getInteractionPhaseCatalog(): Promise<CatalogDTO[]>;
  getInterestLevelCatalog(): Promise<CatalogDTO[]>;
  getContactStatusCatalog(): Promise<CatalogDTO[]>;
  getHousingSectorCatalog(): Promise<CatalogDTO[]>;
  getInterestInNewServiceCatalog(): Promise<CatalogDTO[]>;
  getPreferredPlanCatalog(): Promise<CatalogDTO[]>;
  getAreasForImprovementCatalog(): Promise<CatalogDTO[]>;
  getServiceSatisfactionCatalog(): Promise<CatalogDTO[]>;
  getServiceDurationCatalog(): Promise<CatalogDTO[]>;
  getCurrentPlanCostCatalog(): Promise<CatalogDTO[]>;
  getCurrentProviderCatalog(): Promise<CatalogDTO[]>;
}
