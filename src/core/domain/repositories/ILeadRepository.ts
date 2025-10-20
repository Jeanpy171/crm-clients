import type { Lead } from "../entities/Lead";

export interface ILeadRepository {
  // Define los métodos que el repositorio debe implementar
  getAll(): Promise<Lead[]>;
  getById(id: string): Promise<Lead | null>;
  save(lead: Lead): Promise<void>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<Lead>): Promise<void>;
}
