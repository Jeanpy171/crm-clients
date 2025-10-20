import type { LeadDTO } from "../../../core/application/dtos/leads/LeadDTO";
import { Lead } from "../../../core/domain/entities/Lead";

export class LeadMapper {
  static fromApiToDto(apiResponse: any): LeadDTO {
    return {
      id: apiResponse.lead_id,
      name: apiResponse.name,
      phone: apiResponse.phone,
      sector: apiResponse.sector,
      state: apiResponse.state,
      interest: apiResponse.interest_level,
      lastActivity: apiResponse.last_activity,
      currentCompany: apiResponse.current_company,
      currentPlanValue: apiResponse.current_plan_value,
      serviceTime: apiResponse.service_time,
      satisfactionRating: apiResponse.satisfaction_rating,
      improvementAreas: apiResponse.improvement_areas,
      preferredPlan: apiResponse.preferred_plan,
      interestLevel: apiResponse.interest_level_description,
      whatsMissing: apiResponse.whats_missing,
      advisor: apiResponse.advisor,
    };
  }

  static toDomain(dto: any): Lead {
    return Lead.create(dto);
  }

  static toDTO(lead: Lead): LeadDTO {
    return lead.toJSON();
  }
}
