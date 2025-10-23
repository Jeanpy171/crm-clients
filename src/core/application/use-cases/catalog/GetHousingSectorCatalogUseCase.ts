import type { ICatalogRepository } from "../../../domain/repositories/ICatalogRepository";

export class GetHousingSectorCatalogUseCase {
  private repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getHousingSectorCatalog();
  }
}
