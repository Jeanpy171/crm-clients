import type { Lead } from "../../../core/domain/entities/Lead";
import type { ILeadRepository } from "../../../core/domain/repositories/ILeadRepository";
import { HttpClient } from "../http-client";
import { LeadMapper } from "../mappers/LeadMapper";

export class LeadApiAdapter implements ILeadRepository {
  private http = HttpClient.getInstance();

  async getAll(): Promise<Lead[]> {
    const response = await this.http.get<Lead[]>("/api/leads");
    const data = response as any[];
    const dtos = data.map(LeadMapper.fromApiToDto);
    return dtos.map(LeadMapper.toDomain);
  }

  async getById(id: string): Promise<Lead | null> {
    const response = await this.http.get<Lead>(`/api/leads/${id}`);
    const dto = LeadMapper.fromApiToDto(response);
    return LeadMapper.toDomain(dto);
  }

  async save(lead: Lead): Promise<void> {
    await this.http.post(`/api/leads/`, JSON.stringify(lead));
  }

  async delete(id: string): Promise<void> {
    await this.http.delete(`/api/leads/${id}`);
  }

  async patch(id: string, updates: Partial<Lead>): Promise<void> {
    await this.http.patch(`/api/leads/${id}`, JSON.stringify(updates));
  }
}
