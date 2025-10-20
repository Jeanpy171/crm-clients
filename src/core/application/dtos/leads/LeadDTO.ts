import type {
  LeadInterestLevel,
  LeadStatus,
} from "../../../domain/value-objects/lead";

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
