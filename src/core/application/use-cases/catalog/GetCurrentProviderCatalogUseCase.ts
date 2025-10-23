import type { ICatalogRepository } from "../../../domain/repositories/ICatalogRepository";

export class GetCurrentProviderCatalogUseCase {
  private repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getCurrentProviderCatalog();
  }
}
