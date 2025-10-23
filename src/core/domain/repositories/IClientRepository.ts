import type { ClientDTO } from "../../application/dtos/clients/ClientDTO";
import type { ContactDTO } from "../../application/dtos/contact/ContactDTO";
import type { IHistoryRepository } from "./IHistoryRepository";

export interface FilterClientsParams {
  page: number;
  limit: number;
  advisorId: string;
}

export interface IClientRepository extends IHistoryRepository {
  getAll(params: FilterClientsParams): Promise<ContactDTO[]>;
  // getAllByAdvisorId(id: string): Promise<ClientDTO[]>;
  getById(id: string): Promise<any | null>;
  save(client: Omit<ClientDTO, "history" | "type">): Promise<ClientDTO>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<ClientDTO>): Promise<void>;
}
