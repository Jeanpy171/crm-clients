import type { LeadInterestLevel } from "../../domain/valueObjects/LeadInterestLevel";
import type { LeadStatus } from "../../domain/valueObjects/LeadStatus";

export interface LeadDTO {
  id: string;
  name: string;
  phone: string;
  sector: string;
  state: LeadStatus;
  interest: LeadInterestLevel;
  lastActivity: string;
  currentCompany: string;
  currentPlanValue: string;
  serviceTime: string;
  satisfactionRating: string;
  improvementAreas: string;
  preferredPlan: string;
  interestLevel: string;
  whatsMissing?: string;
  advisor?: string;
}
