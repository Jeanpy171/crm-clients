import type { LeadDTO } from "../../../core/application/dtos/leads/LeadDTO";
import { Contact } from "../../../core/domain/entities/Contact";
import { Lead } from "../../../core/domain/entities/Lead";

export class LeadMapper {
  static fromApiToDto(apiData: any): LeadDTO {
    console.warn("LEADS: ", apiData);
    return {
      id: apiData.id,
      name: apiData.name,
      company: apiData.company,
      email: apiData.email,
      phone: apiData.phone,
      interactionPhase: apiData.interactionPhase,
      interestLevel: apiData.interestLevel,
      status: apiData.status,
      createdAt: apiData.createdAt,
      lastActivity: apiData.lastActivity,
      followUpNotes: apiData.followUpNotes,
      advisor: apiData.advisor,
    };
  }

  static toDomain(dto: LeadDTO): Lead {
    console.warn("LEADS TODOMAIN: ", dto);
    return Lead.create(Contact.create(dto));
  }

  static toDto(lead: Lead): LeadDTO {
    return lead.toJSON();
  }
}
