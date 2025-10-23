import type { ICatalogRepository } from "../../../domain/repositories/ICatalogRepository";

export class GetCurrentPlanCostCatalogUseCase {
  private repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getCurrentPlanCostCatalog();
  }
}
