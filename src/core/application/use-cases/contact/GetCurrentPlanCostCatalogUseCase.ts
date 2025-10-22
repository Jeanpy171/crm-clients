import type { IContactRepository } from "../../../domain/repositories/IContactRepository";

export class GetCurrentPlanCostCatalogUseCase {
  private repository: IContactRepository;

  constructor(repository: IContactRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getCurrentPlanCostCatalog();
  }
}
