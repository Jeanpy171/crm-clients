import type { ICatalogRepository } from "../../../domain/repositories/ICatalogRepository";

export class GetPreferredPlanCatalogUseCase {
  private repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getPreferredPlanCatalog();
  }
}
