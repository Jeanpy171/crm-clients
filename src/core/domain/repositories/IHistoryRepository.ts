import type { HistoryDTO } from "../../application/dtos/contact/HistoryDTO";

export interface IHistoryRepository {
  getHistoryById(id: string): Promise<HistoryDTO[]>;
}
