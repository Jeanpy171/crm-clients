import type { LeadDTO } from "../../application/dtos/leads/LeadDTO";

export interface FilterLeadsParams {
  page: number;
  limit: number;
  advisorId: string;
}

export interface ILeadRepository {
  // Define los métodos que el repositorio debe implementar
  getAll(params: FilterLeadsParams): Promise<LeadDTO[]>;
  // getAllByAdvisorId(id: string): Promise<LeadDTO[]>;
  getById(id: string): Promise<LeadDTO | null>;
  save(lead: LeadDTO): Promise<LeadDTO>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<LeadDTO>): Promise<void>;
}
