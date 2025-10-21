import type { ContactDTO } from "../../application/dtos/contact/ContactDTO";
import type {
  ContactStatus,
  InteractionPhase,
  InterestLevel,
} from "../value-objects/contact";
import { ContactStatusVO } from "../value-objects/contact/ContactStatus";
import { InteractionPhaseVO } from "../value-objects/contact/InteractionPhase";
import { InterestLevelVO } from "../value-objects/contact/InterestLevel";

export class Contact {
  private constructor(
    public name: string,
    public company: string,
    public email: string,
    public phone: string,
    // public sector: string,
    public interactionPhase: InteractionPhase,
    public interestLevel: InterestLevel,
    public status: ContactStatus,
    public createdAt: Date,
    public lastActivity: Date,
    public followUpNotes: string,
    // public currentCompany: string,
    // public currentPlanValue: string,
    // public serviceTime: string,
    // public satisfactionRating: string,
    // public improvementAreas: string,
    // public preferredPlan: string,
    // public whatsMissing?: string,
    public advisor?: string
  ) {}

  static create(props: {
    name: string;
    company: string;
    email: string;
    phone: string;
    // sector: string;
    interactionPhase: InteractionPhase;
    interestLevel: InterestLevel;
    status: ContactStatus;
    createdAt: string;
    lastActivity: string;
    followUpNotes: string;
    // state: LeadStatus;
    // interest: LeadInterestLevel;
    // lastActivity: Date;
    // currentCompany: string;
    // currentPlanValue: string;
    // serviceTime: string;
    // satisfactionRating: string;
    // improvementAreas: string;
    // preferredPlan: string;
    // interestLevel: string;
    // whatsMissing?: string;
    advisor?: string;
  }): Contact {
    const interactionPhase = InteractionPhaseVO.create(props.interactionPhase);
    const contactState = ContactStatusVO.create(props.status);
    const interestLevel = InterestLevelVO.create(props.interestLevel);
    return new Contact(
      props.name,
      props.company,
      props.email,
      props.phone,
      interactionPhase.value,
      interestLevel.value,
      contactState.value,
      new Date(props.createdAt),
      new Date(props.lastActivity),
      props.followUpNotes,
      //   props.phone,
      //   props.sector,
      //   state.value,
      //   interest.value,
      //   props.lastActivity,
      //   props.currentCompany,
      //   props.currentPlanValue,
      //   props.serviceTime,
      //   props.satisfactionRating,
      //   props.improvementAreas,
      //   props.preferredPlan,
      //   props.interestLevel,
      //   props.whatsMissing,
      props.advisor
    );
  }

  toJSON(): ContactDTO {
    return {
      name: this.name,
      company: this.company,
      email: this.email,
      phone: this.phone,
      interactionPhase: this.interactionPhase,
      interestLevel: this.interestLevel,
      status: this.status,
      createdAt: this.createdAt.toISOString(),
      lastActivity: this.lastActivity.toISOString(),
      followUpNotes: this.followUpNotes,
      //   sector: this.sector,
      //   state: this.state,
      //   interest: this.interest,
      //   lastActivity: this.lastActivity.toISOString(),
      //   currentCompany: this.currentCompany,
      //   currentPlanValue: this.currentCompany,
      //   serviceTime: this.serviceTime,
      //   satisfactionRating: this.satisfactionRating,
      //   improvementAreas: this.improvementAreas,
      //   preferredPlan: this.preferredPlan,
      //   interestLevel: this.interestLevel,
      //   whatsMissing: this.whatsMissing!,
      advisor: this.advisor!,
    };
  }
}
