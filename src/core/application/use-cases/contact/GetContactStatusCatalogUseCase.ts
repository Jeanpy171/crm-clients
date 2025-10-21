import type { IContactRepository } from "../../../domain/repositories/IContactRepository";

export class GetContactStatusCatalogUseCase {
  private repository: IContactRepository;

  constructor(repository: IContactRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getContactStatusCatalog();
  }
}
