import type { IContactRepository } from "../../../domain/repositories/IContactRepository";

export class GetServiceSatisfactionCatalogUseCase {
  private repository: IContactRepository;

  constructor(repository: IContactRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getServiceSatisfactionCatalog();
  }
}
