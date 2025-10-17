import type { LeadDTO } from "../../application/dtos/LeadDTO";
import type { LeadInterestLevel } from "../../domain/valueObjects/LeadInterestLevel";
import type { LeadStatus } from "../../domain/valueObjects/LeadStatus";

export class LeadResponseMapper {
  static fromApiResponse(apiResponse: any): LeadDTO {
    return {
      id: apiResponse.lead_id,
      name: apiResponse.name,
      phone: apiResponse.phone,
      sector: apiResponse.sector,
      state: apiResponse.state as LeadStatus,
      interest: apiResponse.interest_level as LeadInterestLevel,
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
}
