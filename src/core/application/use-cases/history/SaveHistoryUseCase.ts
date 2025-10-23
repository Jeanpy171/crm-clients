import type { IHistoryRepository } from "../../../domain/repositories/IHistoryRepository";
import type { HistoryDTO } from "../../dtos/contact/HistoryDTO";

export class SaveHistoryUseCase {
  private repository: IHistoryRepository;

  constructor(repository: IHistoryRepository) {
    this.repository = repository;
  }

  async execute(history: HistoryDTO): Promise<HistoryDTO> {
    return await this.repository.saveHistory(history);
  }
}
