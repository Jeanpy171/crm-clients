import type { LeadDTO } from "../../application/dtos/leads/LeadDTO";
import {
  LeadInterestLevel,
  LeadInterestLevelVO,
} from "../value-objects/lead/LeadInterestLevel";
import { LeadStatus, LeadStatusVO } from "../value-objects/lead/LeadStatus";

export class Lead {
  private constructor(
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

  static create(props: {
    readonly id: string;
    name: string;
    phone: string;
    sector: string;
    state: LeadStatus;
    interest: LeadInterestLevel;
    lastActivity: Date;
    currentCompany: string;
    currentPlanValue: string;
    serviceTime: string;
    satisfactionRating: string;
    improvementAreas: string;
    preferredPlan: string;
    interestLevel: string;
    whatsMissing?: string;
    advisor?: string;
  }): Lead {
    const state = LeadStatusVO.create(props.state);
    const interest = LeadInterestLevelVO.create(props.interestLevel);
    return new Lead(
      props.id,
      props.name,
      props.phone,
      props.sector,
      state.value,
      interest.value,
      props.lastActivity,
      props.currentCompany,
      props.currentPlanValue,
      props.serviceTime,
      props.satisfactionRating,
      props.improvementAreas,
      props.preferredPlan,
      props.interestLevel,
      props.whatsMissing,
      props.advisor
    );
  }

  toJSON(): LeadDTO {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      sector: this.sector,
      state: this.state,
      interest: this.interest,
      lastActivity: this.lastActivity.toISOString(),
      currentCompany: this.currentCompany,
      currentPlanValue: this.currentCompany,
      serviceTime: this.serviceTime,
      satisfactionRating: this.satisfactionRating,
      improvementAreas: this.improvementAreas,
      preferredPlan: this.preferredPlan,
      interestLevel: this.interestLevel,
      whatsMissing: this.whatsMissing!,
      advisor: this.advisor!,
    };
  }
}
