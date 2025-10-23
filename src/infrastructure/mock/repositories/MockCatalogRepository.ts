import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";
import type { ICatalogRepository } from "../../../core/domain/repositories/ICatalogRepository";
import { CatalogMapper } from "../../http/mappers/CatalogMapper";
import {
  contactStatusMocks,
  interactionPhaseMocks,
  interestLevelMocks,
  housingSectorMocks,
  interestInNewServiceMocks,
  preferredPlanMocks,
  areasForImprovementMocks,
  serviceSatisfactionMocks,
  serviceDurationMocks,
  currentPlanCostMocks,
  currentProviderMocks,
} from "../data/contactMock";

export class MockCatalogRepository implements ICatalogRepository {
  async getInteractionPhaseCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = interactionPhaseMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "interaction_phase_id",
              name: "interaction_phase_name",
              description: "interaction_phase_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getInterestLevelCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = interestLevelMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "interest_level_id",
              name: "interest_level_name",
              description: "interest_level_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getContactStatusCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = contactStatusMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "contact_status_id",
              name: "contact_status_name",
              description: "contact_status_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getHousingSectorCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = housingSectorMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "housing_sector_id",
              name: "housing_sector_name",
              description: "housing_sector_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getInterestInNewServiceCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = interestInNewServiceMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "interest_in_new_service_id",
              name: "interest_in_new_service_name",
              description: "interest_in_new_service_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getPreferredPlanCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = preferredPlanMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "preferred_plan_id",
              name: "preferred_plan_name",
              description: "preferred_plan_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getAreasForImprovementCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = areasForImprovementMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "areas_for_improvement_id",
              name: "areas_for_improvement_name",
              description: "areas_for_improvement_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getServiceSatisfactionCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = serviceSatisfactionMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "service_satisfaction_id",
              name: "service_satisfaction_name",
              description: "service_satisfaction_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getServiceDurationCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = serviceDurationMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "service_duration_id",
              name: "service_duration_name",
              description: "service_duration_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getCurrentPlanCostCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = currentPlanCostMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "current_plan_cost_id",
              name: "current_plan_cost_name",
              description: "current_plan_cost_description",
            })
          )
        );
      }, 1500);
    });
  }

  async getCurrentProviderCatalog(): Promise<CatalogDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = currentProviderMocks as any[];
        resolve(
          data.map((values) =>
            CatalogMapper.fromApiToDto(values, {
              id: "current_provider_id",
              name: "current_provider_name",
              description: "current_provider_description",
            })
          )
        );
      }, 1500);
    });
  }
}
