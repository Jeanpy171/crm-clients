import type { ClientDTO } from "../../application/dtos/clients/ClientDTO";

export interface FilterClientsParams {
  page: number;
  limit: number;
  advisorId: string;
}

export interface IClientRepository {
  getAll(params: FilterClientsParams): Promise<ClientDTO[]>;
  // getAllByAdvisorId(id: string): Promise<ClientDTO[]>;
  getById(id: string): Promise<any | null>;
  save(client: ClientDTO): Promise<ClientDTO>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<ClientDTO>): Promise<void>;
}
