import type { LeadInterestLevel } from "../valueObjects/LeadInterestLevel";
import type { LeadStatus } from "../valueObjects/LeadStatus";

export class Lead {
  constructor(
    public readonly id: string,
    public name: string,
    public phone: string,
    public sector: string,
    public state: LeadStatus,
    public interest: LeadInterestLevel,
    public lastActivity: Date,
    public currentCompany: string,
    public currentPlanValue: string,
    public serviceTime: string,
    public satisfactionRating: string,
    public improvementAreas: string,
    public preferredPlan: string,
    public interestLevel: string,
    public whatsMissing?: string,
    public advisor?: string
  ) {}
}
