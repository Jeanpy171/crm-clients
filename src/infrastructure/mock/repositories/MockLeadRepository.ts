import type { HistoryDTO } from "../../../core/application/dtos/contact/HistoryDTO";
import type { LeadDTO } from "../../../core/application/dtos/leads/LeadDTO";
import type {
  FilterLeadsParams,
  ILeadRepository,
} from "../../../core/domain/repositories/ILeadRepository";

import { LeadMapper } from "../../http/mappers/LeadMapper";
import { contactActivity } from "../data/contactActivity";
import { leadMocks } from "../data/leadMock";

export class MockLeadRepository implements ILeadRepository {
  async getHistoryById(id: string): Promise<HistoryDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const data = contactActivity.filter(
      (activity) => activity.idContact === id
    );
    return data;
  }

  async getAll({
    page,
    limit,
    advisorId,
  }: FilterLeadsParams): Promise<LeadDTO[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = leadMocks as any[];
        let leads = data.map(LeadMapper.fromApiToDto);

        if (advisorId) {
          leads = leads.filter((lead) => lead.advisor === advisorId);
        }
        resolve(leads);
      }, 1500);
    });
  }

  // async getAllByAdvisorId(id: string): Promise<LeadDTO[]> {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const data = leadMocks as any[];
  //       const leads = data.map(LeadMapper.fromApiToDto);
  //       const filteredLeads = leads.filter((lead) => lead.advisor === id);
  //       resolve(filteredLeads);
  //     }, 1500);
  //   });
  // }

  async getById(id: string): Promise<LeadDTO | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = leadMocks.find((lead) => lead.id === id);
        if (!response) throw new Error("Lead no encontrado");

        const lead = response;

        resolve(LeadMapper.fromApiToDto(lead));
      }, 1500);
    });
  }

  async save(lead: LeadDTO): Promise<LeadDTO> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(lead);
      }, 1500);
    });
    // await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }

  async delete(id: string): Promise<void> {
    // await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<LeadDTO>): Promise<void> {
    // await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
