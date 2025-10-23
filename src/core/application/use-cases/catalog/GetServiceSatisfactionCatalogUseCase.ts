import type { ICatalogRepository } from "../../../domain/repositories/ICatalogRepository";

export class GetServiceSatisfactionCatalogUseCase {
  private repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getServiceSatisfactionCatalog();
  }
}
