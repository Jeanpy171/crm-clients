import { HttpClient } from "../../../../core/http/httpclient";
import { LeadMapper } from "../../application/mappers/LeadMapper";
import { Lead } from "../../domain/entities/Lead";
import type { LeadRepositoryPort } from "../../domain/ports/LeadRepositoryPort";
import { LeadResponseMapper } from "../mappers/LeadResponseMapper";

export class LeadApiAdapter implements LeadRepositoryPort {
  private http = HttpClient.getInstance();

  async getAll(): Promise<Lead[]> {
    const response = await this.http.get<Lead[]>("/api/leads");
    const data = response as any[];
    const dtos = data.map(LeadResponseMapper.fromApiResponse);
    return dtos.map(LeadMapper.fromDTO);
  }

  async getById(id: string): Promise<Lead | null> {
    const response = await this.http.get<Lead>(`/api/leads/${id}`);
    const dto = LeadResponseMapper.fromApiResponse(response);
    return LeadMapper.fromDTO(dto);
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
