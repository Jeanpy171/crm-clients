import type { ITaskRepository } from "../../../domain/repositories/ITaskRepository";

export class GetTaskTypeCatalogUseCase {
  private repository: ITaskRepository;

  constructor(repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute() {
    return this.repository.getTypeCatalog();
  }
}
