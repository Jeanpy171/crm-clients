import { Lead } from "../../domain/entities/Lead";
import type { LeadDTO } from "../dtos/LeadDTO";

export class LeadMapper {
  static fromDTO(dto: LeadDTO): Lead {
    return new Lead(
      dto.id,
      dto.name,
      dto.phone,
      dto.sector,
      dto.state,
      dto.interest,
      new Date(dto.lastActivity),
      dto.currentCompany,
      dto.currentPlanValue,
      dto.serviceTime,
      dto.satisfactionRating,
      dto.improvementAreas,
      dto.preferredPlan,
      dto.interestLevel,
      dto.whatsMissing,
      dto.advisor
    );
  }

  static toDTO(lead: Lead): LeadDTO {
    return {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      sector: lead.sector,
      state: lead.state,
      interest: lead.interest,
      lastActivity: lead.lastActivity.toISOString(),
      currentCompany: lead.currentCompany,
      currentPlanValue: lead.currentCompany,
      serviceTime: lead.serviceTime,
      satisfactionRating: lead.satisfactionRating,
      improvementAreas: lead.improvementAreas,
      preferredPlan: lead.preferredPlan,
      interestLevel: lead.interestLevel,
      whatsMissing: lead.whatsMissing!,
      advisor: lead.advisor!,
    };
  }
}
