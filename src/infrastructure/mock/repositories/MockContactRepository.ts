import type { CatalogDTO } from "../../../core/application/dtos/catalogs/CatalogDTO";
import type { IContactRepository } from "../../../core/domain/repositories/IContactRepository";
import { CatalogMapper } from "../../http/mappers/CatalogMapper";
import {
  contactStatusMocks,
  interactionPhaseMocks,
  interestLevelMocks,
} from "../data/contactMock";

export class MockContactRepository implements IContactRepository {
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
}
