import type { IHistoryRepository } from "../../../domain/repositories/IHistoryRepository";
import type { HistoryDTO } from "../../dtos/contact/HistoryDTO";

export class GetHistoryUseCase {
  private repository: IHistoryRepository;

  constructor(repository: IHistoryRepository) {
    this.repository = repository;
  }

  async execute(id: string): Promise<HistoryDTO[]> {
    return await this.repository.getHistoryById(id);
  }
}
